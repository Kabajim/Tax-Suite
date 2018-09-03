import React from 'react';
import { BrowserRouter, Route, Switch, Link} from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import PageNotFound from '../components/basics/PageNotFound'
import Dashboard from '../components/dashboard/Dashboard'
import AppBarTaxSuite from '../components/basics/AppBarTaxSuite'
import SideBar from '../components/basics/SideBar'


class AppRouter extends React.Component {
 
    theme = createMuiTheme({
        palette: {
          primary: {
            light: '#000000',
            main: '#1A1A1A',
            dark: '#000000',
            contrastText: '#ffffff',
          },
          secondary: {
            light: '#ff7961',
            main: '#FF6900',
            dark: '#ba000d',
            contrastText: '#000',
          },
          action: {
              selected: ""
          },
        },
      });

    render() {
        return (
            <MuiThemeProvider theme={this.theme}>
                <CssBaseline />
                <BrowserRouter>
                    <div>  
                        <Route path="/" component={AppBarTaxSuite} />
                        <Route path="/" component={SideBar} />
                        <Switch>
                            <Route path="/dashboard" component={Dashboard} />
                            <Route component={PageNotFound} />
                        </Switch>
                    </div>
                </BrowserRouter>
            </MuiThemeProvider>
        )
    };
};

export default AppRouter;