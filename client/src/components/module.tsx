import { useState, type FormEvent, type ChangeEvent } from 'react';
import Auth from '../utils/auth';
import { login } from '../api/authAPI';
import type { UserLogin } from '../interfaces/UserLogin';
// import 'bootstrap/dist/css/bootstrap.min.css';

const Module: React.FC = () => {
  const [formData, setFormData] = useState<UserLogin>({
    username: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, type, checked, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      const data = await login(formData);
      Auth.login(data.token);
    } catch (err) {
      console.error('Failed to login', err);
    }
  };

  return (
    <div className="p-3 m-0 border-0 bd-example">
      <div className="dropdown-menu">
        <form className="px-4 py-3" onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="username" className="form-label">Username</label>
            <input
              type="text"
              className="form-control"
              id="username"
              name="username"
              placeholder="username"
              value={formData.username || ''}
              onChange={handleChange}
              required
            />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              name="password"
              placeholder="Password"
              value={formData.password || ''}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary me-2">Login</button>
          <button type="button" className="btn btn-secondary">Create Account</button>
        </form>
      </div>
    </div>
  );
};

export default Module;
