export const users = [
  { id: 20, name: 'Tina Evans', email: 'tina.evans@example.com', role: 'Admin', status: true },
  { id: 19, name: 'Steve Parker', email: 'steve.parker@example.com', role: 'Viewer', status: false },
  { id: 18, name: 'Rachel Carter', email: 'rachel.carter@example.com', role: 'Editor', status: true },
  { id: 17, name: 'Quinn Adams', email: 'quinn.adams@example.com', role: 'Admin', status: true },
  { id: 16, name: 'Paul Scott', email: 'paul.scott@example.com', role: 'Viewer', status: true },
  { id: 15, name: 'Olivia King', email: 'olivia.king@example.com', role: 'Editor', status: false },
  { id: 14, name: 'Nathan Allen', email: 'nathan.allen@example.com', role: 'Viewer', status: true },
  { id: 13, name: 'Mia Hall', email: 'mia.hall@example.com', role: 'Admin', status: true },
  { id: 12, name: 'Larry Walker', email: 'larry.walker@example.com', role: 'Editor', status: false },
  { id: 11, name: 'Kathy Young', email: 'kathy.young@example.com', role: 'Viewer', status: true },
  { id: 10, name: 'Jack Lewis', email: 'jack.lewis@example.com', role: 'Editor', status: true },
  { id: 9, name: 'Ivy Clark', email: 'ivy.clark@example.com', role: 'Admin', status: true },
  { id: 8, name: 'Hank Harris', email: 'hank.harris@example.com', role: 'Viewer', status: false },
  { id: 7, name: 'Grace Wilson', email: 'grace.wilson@example.com', role: 'Editor', status: true },
  { id: 6, name: 'Frank Taylor', email: 'frank.taylor@example.com', role: 'Viewer', status: true },
  { id: 5, name: 'Eve Davis', email: 'eve.davis@example.com', role: 'Admin', status: false },
  { id: 4, name: 'David Brown', email: 'david.brown@example.com', role: 'Editor', status: true },
  { id: 3, name: 'Carol White', email: 'carol.white@example.com', role: 'Viewer', status: true },
  { id: 2, name: 'Bob Smith', email: 'bob.smith@example.com', role: 'Editor', status: false },
  { id: 1, name: 'Alice Johnson', email: 'alice.johnson@example.com', role: 'Admin', status: true },
];


export const roles = [
  { id: 1, name: 'Admin', permissions: {read:true,write:true,delete:true,}, description: 'Full access to the system'  },
  { id: 2, name: 'Editor', permissions: {read:true,write:true,delete:false,}, description: 'Can edit content'  },
  { id: 3, name: 'Viewer', permissions: {read:true,write:false,delete:false,}, description: 'Can only view content'  },
];

export const initialActivity = [
    { id: 1, user: 'Alice', action: 'Added a new role', timestamp: '12/6/2024, 14:35:00', },
    { id: 2, user: 'Bob', action: 'Deleted a user', timestamp: '12/6/2024, 13:20:00', },
    { id: 3, user: 'Charlie', action: 'Updated permissions', timestamp: '12/6/2024, 12:15:00', },
    { id: 4, user: 'Alice', action: 'Added a new user', timestamp: '12/5/2024, 18:45:00' },
];

export const getUsers = () => Promise.resolve([...users]);

export const getRoles = () => Promise.resolve([...roles]);
