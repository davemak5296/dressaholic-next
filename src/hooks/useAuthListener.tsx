import { useEffect, useState } from "react";
import { auth } from "../utils/firebase.utils";

const useAuthStateListener = () => {
  const [ currUser, setCurrUser ] = useState(auth.currentUser);
   useEffect(() => {
    const unsub = auth.onAuthStateChanged( currentUser => setCurrUser(currentUser) )
    return () => unsub()
  }, [])

  return { currUser, setCurrUser }
}

export default useAuthStateListener;