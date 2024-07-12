const users = JSON.parse(localStorage.getItem('users')) || [];
let currentUser = null;

export const signupUser = (username, email, password) => {
  const userExists = users.some((user) => user.username === username);
  if (!userExists) {
    const newUser = { username, email, password };
    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));
    setCurrentUser(newUser);
    return true;
  }
  return false;
};

export const loginUser = (email, password) => {
  const user = users.find((user) => user.email === email && user.password == password);
  if (user) {
    setCurrentUser(user);
    return true;
  } else {
    return false;
  }
};


export const logout = () => {
  localStorage.removeItem('currentUser')
  setTimeout(() => {
  window.location.reload()
  }, 1000);

}

const setCurrentUser = (user) => {
  currentUser = user;
  localStorage.setItem('currentUser', JSON.stringify(user));
};

export function getCurrentUser() {
  return JSON.parse(localStorage.getItem('currentUser'));
};