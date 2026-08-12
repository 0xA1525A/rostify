import { FormEvent, useEffect, useState } from 'react'
import { createUser, getUsers, type User } from './api'

function App() {
  const [users, setUsers] = useState<User[]>([])
  const [username, setUsername] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function loadUsers() {
    try {
      const users = await getUsers()
      setUsers(users)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'Failed to load users')
    }
  }

  useEffect(() => {
    loadUsers()
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()

    if (!username.trim()) {
      return
    }

    setLoading(true)
    setError(null)

    try {
      const user = await createUser(username.trim())

      setUsers((currentUsers) => [...currentUsers, user])
      setUsername('')
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to create user',
      )
    } finally {
      setLoading(false)
    }
  }

  return (
    <main>
      <h1>Rostify</h1>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
          placeholder="Username"
        />

        <button type="submit" disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>

      {error && <p>{error}</p>}

      <h2>Users</h2>

      {users.length === 0 ? (
        <p>No users</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id}>
              {user.username}
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}

export default App;