import React, { useState, useEffect } from 'react';
import cityService from '../services/cityService';
import movieService from '../services/movieService';
import theaterService from '../services/theaterService';
import screenService from '../services/screenService';
import seatService from '../services/seatService';
import showService from '../services/showService';
import { useToast } from '../components/Toast';

// ─── reusable small components ───────────────────────────────────────────────
function Field({ label, children }) {
  return (
    <div className="form-group" style={{ flex: 1, minWidth: 140, margin: 0 }}>
      <label>{label}</label>
      {children}
    </div>
  );
}

// ─── CITIES TAB ──────────────────────────────────────────────────────────────
function CitiesTab({ onCitiesChange }) {
  const showToast = useToast();
  const [cities, setCities] = useState([]);
  const [name, setName] = useState('');
  const [state, setState] = useState('');

  const load = async () => {
    try { const d = await cityService.getAll(); setCities(d); onCitiesChange(d); }
    catch { showToast('Could not load cities', 'error'); }
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!name.trim()) { showToast('Enter city name', 'error'); return; }
    try {
      await cityService.add({ name: name.trim(), state: state.trim() });
      showToast('City added!', 'success');
      setName(''); setState('');
      load();
    } catch (e) { showToast(e.response?.data?.message || 'Failed', 'error'); }
  };

  return (
    <div>
      <div className="admin-form-row">
        <Field label="City Name"><input value={name} onChange={e => setName(e.target.value)} placeholder="Mumbai" /></Field>
        <Field label="State"><input value={state} onChange={e => setState(e.target.value)} placeholder="Maharashtra" /></Field>
        <button className="btn btn-primary" onClick={add}>Add City</button>
      </div>
      {cities.length === 0 ? <div className="empty-state"><p>No cities yet</p></div> : (
        <table className="data-table">
          <thead><tr><th>ID</th><th>Name</th><th>State</th></tr></thead>
          <tbody>{cities.map(c => <tr key={c.id}><td>{c.id}</td><td>{c.name}</td><td>{c.state || '—'}</td></tr>)}</tbody>
        </table>
      )}
    </div>
  );
}

// ─── MOVIES TAB ──────────────────────────────────────────────────────────────
function MoviesTab({ onMoviesChange }) {
  const showToast = useToast();
  const [movies, setMovies] = useState([]);
  const [form, setForm] = useState({ title: '', genre: '', language: '', durationMinutes: '', rating: '', releaseDate: '', description: '' });

  const load = async () => {
    try { const d = await movieService.getAll(); setMovies(d); onMoviesChange(d); }
    catch { showToast('Could not load movies', 'error'); }
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.title.trim()) { showToast('Enter movie title', 'error'); return; }
    try {
      await movieService.add({
        ...form,
        durationMinutes: form.durationMinutes ? parseInt(form.durationMinutes) : null,
        rating: form.rating ? parseFloat(form.rating) : null,
        releaseDate: form.releaseDate || null,
      });
      showToast('Movie added!', 'success');
      setForm({ title: '', genre: '', language: '', durationMinutes: '', rating: '', releaseDate: '', description: '' });
      load();
    } catch (e) { showToast(e.response?.data?.message || 'Failed', 'error'); }
  };

  const del = async (id) => {
    if (!window.confirm('Delete this movie?')) return;
    try { await movieService.delete(id); showToast('Deleted', 'success'); load(); }
    catch { showToast('Could not delete', 'error'); }
  };

  const f = (k) => ({ value: form[k], onChange: e => setForm({ ...form, [k]: e.target.value }) });

  return (
    <div>
      <div className="admin-form-row" style={{ flexWrap: 'wrap' }}>
        <Field label="Title"><input {...f('title')} placeholder="Movie title" /></Field>
        <Field label="Genre"><input {...f('genre')} placeholder="Action" /></Field>
        <Field label="Language"><input {...f('language')} placeholder="Hindi" /></Field>
        <Field label="Duration (min)"><input type="number" {...f('durationMinutes')} placeholder="150" /></Field>
        <Field label="Rating"><input type="number" step="0.1" {...f('rating')} placeholder="8.5" /></Field>
        <Field label="Release Date"><input type="date" {...f('releaseDate')} /></Field>
      </div>
      <div className="form-group" style={{ marginBottom: '1rem' }}>
        <label>Description</label>
        <input {...f('description')} placeholder="Short description" />
      </div>
      <button className="btn btn-primary" style={{ marginBottom: '1.5rem' }} onClick={add}>Add Movie</button>
      {movies.length === 0 ? <div className="empty-state"><p>No movies yet</p></div> : (
        <table className="data-table">
          <thead><tr><th>ID</th><th>Title</th><th>Genre</th><th>Language</th><th>Duration</th><th>Rating</th><th>Action</th></tr></thead>
          <tbody>
            {movies.map(m => (
              <tr key={m.id}>
                <td>{m.id}</td><td>{m.title}</td><td>{m.genre || '—'}</td>
                <td>{m.language || '—'}</td><td>{m.durationMinutes ? m.durationMinutes + ' min' : '—'}</td>
                <td>{m.rating || '—'}</td>
                <td><button className="btn btn-sm btn-danger" onClick={() => del(m.id)}>Delete</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ─── THEATERS TAB ────────────────────────────────────────────────────────────
function TheatersTab({ cities, onTheatersChange }) {
  const showToast = useToast();
  const [theaters, setTheaters] = useState([]);
  const [form, setForm] = useState({ name: '', address: '', cityId: '' });

  const load = async () => {
    try { const d = await theaterService.getAll(); setTheaters(d); onTheatersChange(d); }
    catch { showToast('Could not load theaters', 'error'); }
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.name.trim() || !form.cityId) { showToast('Fill name and city', 'error'); return; }
    try {
      await theaterService.add({ name: form.name.trim(), address: form.address.trim(), cityId: parseInt(form.cityId) });
      showToast('Theater added!', 'success');
      setForm({ name: '', address: '', cityId: '' });
      load();
    } catch (e) { showToast(e.response?.data?.message || 'Failed', 'error'); }
  };

  return (
    <div>
      <div className="admin-form-row">
        <Field label="Theater Name"><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="PVR Cinemas" /></Field>
        <Field label="Address"><input value={form.address} onChange={e => setForm({ ...form, address: e.target.value })} placeholder="Mall Road" /></Field>
        <Field label="City">
          <select value={form.cityId} onChange={e => setForm({ ...form, cityId: e.target.value })}>
            <option value="">Select City</option>
            {cities.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
          </select>
        </Field>
        <button className="btn btn-primary" onClick={add}>Add Theater</button>
      </div>
      {theaters.length === 0 ? <div className="empty-state"><p>No theaters yet</p></div> : (
        <table className="data-table">
          <thead><tr><th>ID</th><th>Name</th><th>Address</th><th>City</th></tr></thead>
          <tbody>
            {theaters.map(t => (
              <tr key={t.id}>
                <td>{t.id}</td><td>{t.name}</td><td>{t.address || '—'}</td><td>{t.city?.name || '—'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ─── SCREENS TAB ─────────────────────────────────────────────────────────────
function ScreensTab({ theaters, onScreensChange }) {
  const showToast = useToast();
  const [screens, setScreens] = useState([]);
  const [form, setForm] = useState({ name: '', totalSeats: '', theaterId: '' });

  const load = async () => {
    try { const d = await screenService.getAll(); setScreens(d); onScreensChange(d); }
    catch { showToast('Could not load screens', 'error'); }
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.name.trim() || !form.theaterId) { showToast('Fill name and theater', 'error'); return; }
    try {
      await screenService.add({ name: form.name.trim(), totalSeats: parseInt(form.totalSeats) || null, theaterId: parseInt(form.theaterId) });
      showToast('Screen added!', 'success');
      setForm({ name: '', totalSeats: '', theaterId: '' });
      load();
    } catch (e) { showToast(e.response?.data?.message || 'Failed', 'error'); }
  };

  return (
    <div>
      <div className="admin-form-row">
        <Field label="Screen Name"><input value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="Screen 1" /></Field>
        <Field label="Total Seats"><input type="number" value={form.totalSeats} onChange={e => setForm({ ...form, totalSeats: e.target.value })} placeholder="100" /></Field>
        <Field label="Theater">
          <select value={form.theaterId} onChange={e => setForm({ ...form, theaterId: e.target.value })}>
            <option value="">Select Theater</option>
            {theaters.map(t => <option key={t.id} value={t.id}>{t.name} ({t.city?.name || ''})</option>)}
          </select>
        </Field>
        <button className="btn btn-primary" onClick={add}>Add Screen</button>
      </div>
      {screens.length === 0 ? <div className="empty-state"><p>No screens yet</p></div> : (
        <table className="data-table">
          <thead><tr><th>ID</th><th>Name</th><th>Seats</th><th>Theater</th></tr></thead>
          <tbody>
            {screens.map(s => (
              <tr key={s.id}><td>{s.id}</td><td>{s.name}</td><td>{s.totalSeats || '—'}</td><td>{s.theater?.name || '—'}</td></tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ─── SEATS TAB ───────────────────────────────────────────────────────────────
function SeatsTab({ screens }) {
  const showToast = useToast();
  const [seats, setSeats] = useState([]);
  const [screenId, setScreenId] = useState('');
  const [row, setRow] = useState('');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [seatType, setSeatType] = useState('REGULAR');

  const loadSeats = async (sid) => {
    if (!sid) { setSeats([]); return; }
    try { setSeats(await seatService.getByScreen(sid)); }
    catch { setSeats([]); }
  };

  const add = async () => {
    if (!screenId || !row.trim() || !from || !to) { showToast('Fill all fields', 'error'); return; }
    if (parseInt(from) > parseInt(to)) { showToast('From must be ≤ To', 'error'); return; }
    try {
      for (let col = parseInt(from); col <= parseInt(to); col++) {
        await seatService.add({ seatNumber: row.toUpperCase() + col, row: row.toUpperCase(), col, seatType, screenId: parseInt(screenId) });
      }
      showToast(`Added seats ${row.toUpperCase()}${from} to ${row.toUpperCase()}${to}!`, 'success');
      loadSeats(screenId);
    } catch (e) { showToast(e.response?.data?.message || 'Failed', 'error'); }
  };

  return (
    <div>
      <div className="admin-form-row" style={{ flexWrap: 'wrap' }}>
        <Field label="Screen">
          <select value={screenId} onChange={e => { setScreenId(e.target.value); loadSeats(e.target.value); }}>
            <option value="">Select Screen</option>
            {screens.map(s => <option key={s.id} value={s.id}>{s.name} — {s.theater?.name || ''}</option>)}
          </select>
        </Field>
        <Field label="Row (e.g. A)"><input value={row} onChange={e => setRow(e.target.value)} placeholder="A" maxLength={2} /></Field>
        <Field label="From Col"><input type="number" value={from} onChange={e => setFrom(e.target.value)} placeholder="1" /></Field>
        <Field label="To Col"><input type="number" value={to} onChange={e => setTo(e.target.value)} placeholder="10" /></Field>
        <Field label="Type">
          <select value={seatType} onChange={e => setSeatType(e.target.value)}>
            <option value="REGULAR">REGULAR</option>
            <option value="PREMIUM">PREMIUM</option>
            <option value="VIP">VIP</option>
          </select>
        </Field>
        <button className="btn btn-primary" onClick={add}>Add Seats</button>
      </div>
      <p style={{ color: 'var(--text-muted)', fontSize: '0.8rem', marginBottom: '1rem' }}>
        💡 Creates seats from col "From" to "To" for the given row (e.g. A1, A2...A10)
      </p>
      {seats.length === 0 ? (screenId ? <div className="empty-state"><p>No seats for this screen</p></div> : null) : (
        <table className="data-table">
          <thead><tr><th>ID</th><th>Seat #</th><th>Row</th><th>Col</th><th>Type</th></tr></thead>
          <tbody>
            {seats.map(s => <tr key={s.id}><td>{s.id}</td><td>{s.seatNumber}</td><td>{s.row || '—'}</td><td>{s.col || '—'}</td><td>{s.seatType || '—'}</td></tr>)}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ─── SHOWS TAB ───────────────────────────────────────────────────────────────
function ShowsTab({ movies, screens }) {
  const showToast = useToast();
  const [shows, setShows] = useState([]);
  const [form, setForm] = useState({ movieId: '', screenId: '', showDate: '', startTime: '', endTime: '', ticketPrice: '' });

  const load = async () => {
    try { setShows(await showService.getAll()); }
    catch { showToast('Could not load shows', 'error'); }
  };

  useEffect(() => { load(); }, []);

  const add = async () => {
    if (!form.movieId || !form.screenId || !form.showDate || !form.startTime) {
      showToast('Fill movie, screen, date and start time', 'error'); return;
    }
    try {
      await showService.add({
        movieId: parseInt(form.movieId), screenId: parseInt(form.screenId),
        showDate: form.showDate, startTime: form.startTime,
        endTime: form.endTime || null, ticketPrice: parseFloat(form.ticketPrice) || 0,
      });
      showToast('Show added!', 'success');
      setForm({ movieId: '', screenId: '', showDate: '', startTime: '', endTime: '', ticketPrice: '' });
      load();
    } catch (e) { showToast(e.response?.data?.message || 'Failed', 'error'); }
  };

  const f = (k) => ({ value: form[k], onChange: e => setForm({ ...form, [k]: e.target.value }) });

  return (
    <div>
      <div className="admin-form-row" style={{ flexWrap: 'wrap' }}>
        <Field label="Movie">
          <select {...f('movieId')}>
            <option value="">Select Movie</option>
            {movies.map(m => <option key={m.id} value={m.id}>{m.title}</option>)}
          </select>
        </Field>
        <Field label="Screen">
          <select {...f('screenId')}>
            <option value="">Select Screen</option>
            {screens.map(s => <option key={s.id} value={s.id}>{s.name} — {s.theater?.name || ''}</option>)}
          </select>
        </Field>
        <Field label="Date"><input type="date" {...f('showDate')} /></Field>
        <Field label="Start Time"><input type="time" {...f('startTime')} /></Field>
        <Field label="End Time"><input type="time" {...f('endTime')} /></Field>
        <Field label="Price (₹)"><input type="number" {...f('ticketPrice')} placeholder="250" /></Field>
        <button className="btn btn-primary" onClick={add}>Add Show</button>
      </div>
      {shows.length === 0 ? <div className="empty-state"><p>No shows yet</p></div> : (
        <table className="data-table">
          <thead><tr><th>ID</th><th>Movie</th><th>Screen</th><th>Date</th><th>Time</th><th>Price</th></tr></thead>
          <tbody>
            {shows.map(s => (
              <tr key={s.id}>
                <td>{s.id}</td><td>{s.movie?.title || '—'}</td>
                <td>{s.screen?.name || '—'} ({s.screen?.theater?.name || ''})</td>
                <td>{s.showDate}</td>
                <td>{s.startTime}{s.endTime ? ` - ${s.endTime}` : ''}</td>
                <td>₹{s.ticketPrice || 0}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ─── MAIN ADMIN PAGE ─────────────────────────────────────────────────────────
const TABS = ['cities', 'movies', 'theaters', 'screens', 'seats', 'shows'];

export default function Admin() {
  const [activeTab, setActiveTab] = useState('cities');
  const [cities, setCities] = useState([]);
  const [movies, setMovies] = useState([]);
  const [theaters, setTheaters] = useState([]);
  const [screens, setScreens] = useState([]);

  return (
    <div className="container">
      <h2 className="section-title">Admin Panel</h2>

      <div className="tabs">
        {TABS.map(t => (
          <button key={t} className={`tab ${activeTab === t ? 'active' : ''}`} onClick={() => setActiveTab(t)}>
            {t.charAt(0).toUpperCase() + t.slice(1)}
          </button>
        ))}
      </div>

      {activeTab === 'cities' && <CitiesTab onCitiesChange={setCities} />}
      {activeTab === 'movies' && <MoviesTab onMoviesChange={setMovies} />}
      {activeTab === 'theaters' && <TheatersTab cities={cities} onTheatersChange={setTheaters} />}
      {activeTab === 'screens' && <ScreensTab theaters={theaters} onScreensChange={setScreens} />}
      {activeTab === 'seats' && <SeatsTab screens={screens} />}
      {activeTab === 'shows' && <ShowsTab movies={movies} screens={screens} />}
    </div>
  );
}
