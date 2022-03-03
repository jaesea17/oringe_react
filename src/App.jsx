import React, { useEffect, useState } from "react";
import { Route, Switch } from "react-router-dom";
import ProtectedRoute from "./components/routes/ProtectedRoute";
import { auth } from "./components/util/auth";
import Signin from "./pages/admin/Signin";
import Signup from "./pages/admin/Signup";
import AdminDashboard from "./pages/dashboards/AdminDashboard";
import UserDashboard from "./pages/dashboards/UserDashboard";
import { UserContext } from "./useContext";


const App = () => {
   let [isAuth, setIsAuth] = useState(false);
   
   //EFFECTS
   useEffect(()=>{
      //invoking the auth()
      auth()
      //setting the state to be the value of the auth()
        setIsAuth(auth)
    },[isAuth]);

   return (
        <Switch>
           
           <Route exact path="/">
               <div>
                  <UserDashboard />
               </div>
           </Route>
           
           {/* <Route exact path="/admin">
               <div>
                  <AdminDashboard />
               </div>
           </Route> */}

           <ProtectedRoute exact path='/admin' auth={isAuth} component={AdminDashboard}/>

           <Route exact path="/admin/signin">
               <div>
                  <UserContext.Provider value={[isAuth, setIsAuth]}>
                    <Signin />
                  </UserContext.Provider>
               </div>
           </Route>

           <Route exact path="/admin/signup">
               <div>
                  <Signup />
               </div>
           </Route>

        </Switch>
      )
};
export default App;