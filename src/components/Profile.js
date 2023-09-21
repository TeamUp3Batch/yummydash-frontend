import { useState,useEffect } from "react";
import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

const Profile = () => {
  const { user, isAuthenticated, getAccessTokenSilently } = useAuth0();
  const [userMetadata, setUserMetadata] = useState(null);
  const apiUrl = "http://localhost:5200/authorized"; // Replace with your API endpoint

  useEffect(() => {
    const getUserMetadata = async () => {
      console.log("user.sub",user)
      const domain = "dev-mlxkwbtruscyfbve.us.auth0.com"
  
      try {
        const accessToken = await getAccessTokenSilently({
          authorizationParams: {
            audience: `https://${domain}/api/v2/`,
            scope: "read:current_user",
          },
        });
  
        const userDetailsByIdUrl = `https://${domain}/api/v2/users/${user.sub}`;
  
        const metadataResponse = await fetch(userDetailsByIdUrl, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });
  
        const { user_metadata } = await metadataResponse.json();
  
        setUserMetadata(user_metadata);
        console.log("user_metadata",user_metadata)
      } catch (e) {
        console.log(e.message);
      }
    };
  
    getUserMetadata();
  }, [getAccessTokenSilently, user?.sub]);

 const getApi = async() =>{
  try{
    const token =  await getAccessTokenSilently();
    console.log("token",token)
  const response = await axios.get(apiUrl)
  console.log("response data", response);
}catch(error){
  if (error.response) {
    // The request was made, but the server responded with an error status code.
    console.error("Server Error:", error.response.data);
  } else if (error.request) {
    // The request was made, but there was no response received.
    console.error("No Response:", error.request);
  } else {
    // Something else went wrong.
    console.error("Request Error:", error.message);
  }}
 }
 const getHello = async() =>{
  getAccessTokenSilently().then((token) => {
    axios
    .get('http://localhost:5200/hello', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
})
 }
 const storeData = async () => {
  console.log("hitting store data btn");

  try {
    const token = await getAccessTokenSilently();
    const userData = {
      name: user.name,
      email: user.email,
      // Add other user details as needed
    };

    const response = await axios.post(
      'http://localhost:5200/api/storeUser',
      userData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    console.log('User data sent successfully:', response.data);
  } catch (error) {
    console.error('Error sending user data:', error);
  }
};
 

  // if (isLoading) {
  //   return <div>Loading ...</div>;
  // }

  return (
    <div>
<button onClick={getApi}>Get API </button>
<button onClick={getHello}>Get jwt api</button>
    {user ? (
    isAuthenticated && (
      <div>
            

        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <button onClick={storeData}>Store details</button>
        <h3>User Metadata</h3>
        {userMetadata ? (
          <pre>{JSON.stringify(userMetadata, null, 2)}</pre>
        ) : (
          "No user metadata defined"
        )}
      </div>
    )
    ) : (
      // User is null, display a message or take appropriate action
      <div>
        <p>No user profile available. Please log in.</p>
      </div>
    )}
    </div>
  );
};

export default Profile;