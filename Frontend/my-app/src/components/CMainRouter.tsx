import React, { Suspense } from "react";
import { RouterItem } from "../common/define-type";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";


const LoginModule = React.lazy(() => import("../pages/login/login"));
const Home = React.lazy(() => import("../pages/home/home"));
// const PageNotFound = React.lazy(() => import("pages/404"));
// const MatrixChatApp = React.lazy(() => import("pages/welcome"));
// const CalendarManager = React.lazy(() => import("pages/calendar/calendarManager"));

const RouterArr: RouterItem[] = [
    {
        path: "/",
        component: LoginModule
    },
    {
        path: "/home",
        component: Home,
        noExact: true
    },
    // {
    //     path: "/welcome",
    //     component: MatrixChatApp
    // },
    // {
    //     path: "/calendar",
    //     component: CalendarManager
    // },
    
    // {
    //     path: "*",
    //     component: PageNotFound
    // },
   
]

export default function CMainRouter(): JSX.Element {
    return (
        <Router>
            {/* <Suspense fallback={<CLoading visible={true} fullScreen={true} />}> */}
                <Switch>
                    <Route path="/login">
                        <LoginModule />
                    </Route>
                    {/* <CPrivateRoute path="/"> */}
                        <>
                            <Switch>
                                {RouterArr.map(({ path, component: Component, noExact, ...rest }) => {
                                    return <Route path={path} component={Component} key={path} exact={noExact ? false : true} {...rest} />
                                })}
                            </Switch>
                        </>
                    {/* </CPrivateRoute> */}
                </Switch>
            {/* </Suspense> */}
        </Router>
    )
}