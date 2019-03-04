import React,{ Component } from 'react'
import Admin from './pages/admin'
import { HashRouter, Route, Switch ,Redirect} from 'react-router-dom'
import Notfound from './pages/404'
import Home from './pages/admin/main/home'
import Buttons from './pages/admin/main/buttons'
import Modals from './pages/admin/main/modals'
import Loading from './pages/admin/main/loading'
import Notification from './pages/admin/main/notification'
import Messages from './pages/admin/main/messages'
import Tabpanes from './pages/admin/main/tabs'
import Gallery from './pages/admin/main/gallery'
import Carousels from './pages/admin/main/carousels'
import FormLogin from './pages/admin/main/formlogin'
import FormRegister from './pages/admin/main/formRegister'
import TableBasic from './pages/admin/main/tableBasic'
import TableHigh from './pages/admin/main/tableHigh'
import City from './pages/admin/main/city'
import Staff from './pages/admin/main/staff'
import OrderDetail from './pages/admin/main/order/detail'
import Order from './pages/admin/main/order'
import BikeMap from './pages/admin/main/bikeMap'
import Common from './pages/common';
import BarChart from './pages/admin/main/echarts/barChart';
import PieChart from './pages/admin/main/echarts/pieChart';
import LineChart from './pages/admin/main/echarts/lineChart';
import RichText from './pages/admin/main/richText';
import Permission from './pages/admin/main/permission';

export default class App extends Component{
    render(){
        return (
            <HashRouter>
                <Switch>
                    <Admin path="/admin">
                        <Switch>
                            <Route path='/admin/home' component={ Home }/>
                            <Route path='/admin/ui/button' component={ Buttons }/>
                            <Route path='/admin/ui/modals' component={ Modals } />
                            <Route path='/admin/ui/loading' component={ Loading } />
                            <Route path='/admin/ui/notification' component={ Notification } />
                            <Route path='/admin/ui/messages' component={ Messages } />
                            <Route path='/admin/ui/tabs' component={ Tabpanes } />
                            <Route path='/admin/ui/gallery' component={ Gallery } />
                            <Route path='/admin/ui/carousel' component={ Carousels } />
                            <Route path='/admin/form/login' component={ FormLogin } />
                            <Route path='/admin/form/reg' component={ FormRegister } />
                            <Route path='/admin/table/basic' component={ TableBasic } />
                            <Route path='/admin/table/high' component={ TableHigh } />
                            <Route path='/admin/city' component={ City } />
                            <Route path='/admin/order' component={ Order } />
                            <Route path='/admin/user' component={ Staff } />
                            <Route path='/admin/bikeMap' component={ BikeMap } />
                            <Route path='/admin/charts/bar' component={ BarChart } />
                            <Route path='/admin/charts/pie' component={ PieChart } />
                            <Route path='/admin/charts/line' component={ LineChart } />
                            <Route path='/admin/rich' component={ RichText } />
                            <Route path='/admin/permission' component={ Permission } />
                            <Route component={ Notfound } />
                        </Switch>
                    </Admin>
                    <Common path="/common">
                        <Switch>
                            <Route path="/common/order/detail" component={ OrderDetail }/>
                            <Route component={ Notfound } />
                        </Switch>
                    </Common>
                    <Redirect to='/admin/home' />
                </Switch>
            </HashRouter>
        )
    }
}