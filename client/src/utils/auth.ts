export interface User {
  id: string;
  username: string;
}

export async function signIn(
  username: string,
  password: string,
): Promise<Response> {
  try {
    return fetch('/api/auth/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
      credentials: 'include', // This is important for including cookies
    });
  } catch (error) {
    console.error('Sign in error:', error);
    return null;
  }
}

export async function signOut(): Promise<void> {
  await fetch('/api/auth/logout', {
    method: 'POST',
    credentials: 'include',
  });
}

export async function getUser(): Promise<User | null> {
  try {
    const response = await fetch('http://localhost:3000/api/auth/user', {
      method: 'GET',
      credentials: 'include',
    });

    if (!response.ok) {
      console.error('Get user error:', response.status, response.statusText);
      return null;
    }

    return await response.json();
  } catch (error) {
    console.error('Get user error:', JSON.stringify(error.message));
    return null;
  }
}

export async function isAuthenticated(): Promise<boolean> {
  const user = await getUser();

  return !!user;
}
