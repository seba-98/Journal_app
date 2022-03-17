import './styles/style.scss';
import { Provider } from 'react-redux';
import { store } from './REDUX- Management/store/store';

import AppRoutes from './routes/AppRoutes';


const App=()=> {
  return (
    <Provider store={store}>
      <AppRoutes />
    </Provider>
  );
}

export default App;
