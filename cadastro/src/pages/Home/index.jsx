import { useEffect, useState, useRef } from 'react';
import './style.css';
import Trash from '../../assets/trash.png';
import api from '../../services/api';

function Home() {
  const [users, setUsers] = useState([]);

  const inputName = useRef();
  const inputAge = useRef();
  const inputEmail = useRef();

  async function getUsers() {
    const usersFromApi = await api.get('/usuarios');

    setUsers(usersFromApi.data);
  }

  async function createUsers() {
    await api.post('/usuarios', {
      name: inputName.current.value,
      age: inputAge.current.value,
      email: inputEmail.current.value,
    });
    getUsers();
  }

  async function deleteUsers(id) {
    await api.delete(`/usuarios/${id}`);
    getUsers();
  }

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <div className="container">
      <form>
        <h1>Cadastro de usuários</h1>
        <input placeholder="Name" name="Name" type="text" ref={inputName} />
        <input placeholder="Age" name="Age" type="number" ref={inputAge} />
        <input
          placeholder="E-mail"
          name="E-mail"
          type="email"
          ref={inputEmail}
        />
        <button type="button" onClick={createUsers}>
          Cadastrar
        </button>
      </form>
      {users.map((user) => (
        <div key={user.id} className="card">
          <div>
            <p>
              Name: <span> {user.name} </span>
            </p>
            <p>
              Age: <span> {user.age}</span>
            </p>
            <p>
              Email: <span>{user.email}</span>
            </p>
          </div>
          <button onClick={() => deleteUsers(user.id)}>
            <img src={Trash} alt="Delete" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default Home;
