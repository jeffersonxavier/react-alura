export default function Logout({ history }) {
  localStorage.removeItem('authToken');
  history.push('/');
  
  return null;
}
