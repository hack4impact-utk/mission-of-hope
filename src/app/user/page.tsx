import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

import React from 'react';

export default function BasicCard() {
  // Test User Code Below
  const exampleUser = {
    _id: {
      $oid: '65ce84429aca7f652bd1fd29',
    },
    lastName: 'Johnson',
    firstName: 'Robert',
    email: 'robert.johnson@example.com',
    admin: true,
  };

  const exampleUser1 = {
    _id: {
      $oid: '65ce84429aca7f652bd1fd29',
    },
    lastName: 'John',
    firstName: 'Robert',
    email: 'robert.johnson@example.com',
    admin: true,
  };

  const userList = [exampleUser, exampleUser1, exampleUser];
  return (
    <div>
      <div
        style={{ display: 'flex', justifyContent: 'center', color: 'orange' }}
      >
        <h1>User List</h1>
      </div>

      {userList.map((user) => {
        return (
          <Card key={user._id.$oid} sx={{ minWidth: 275 }}>
            <div>
              {/* <div style={{ display: 'flex', justifyContent: 'center' }}> */}
              <CardContent>
                <h2 style={{ display: 'flex', justifyContent: 'center' }}>
                  {user.firstName + ' ' + user.lastName}
                </h2>
                <p style={{ display: 'flex', justifyContent: 'center' }}>
                  {user.email}
                </p>
              </CardContent>
            </div>
          </Card>
        );
      })}
    </div>
  );
}
