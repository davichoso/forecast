import React from 'react';
import { Layout, Menu, Breadcrumb } from 'antd';
import Index from './pages/index'
const { Header, Content, Footer } = Layout;
import { PersistGate } from 'redux-persist/integration/react'
import configureStore  from './redux/configureStore'
import { Provider } from 'react-redux';
const { store, persistor } = configureStore();
function App() {

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Layout>
          <Header style={{ position: 'fixed', zIndex: 1, width: '100%' }}>
            <div className="logo" />
            <Menu
              theme="dark"
              mode="horizontal"
              defaultSelectedKeys={['2']}
              style={{ lineHeight: '64px' }}
            >
              <Menu.Item key="1">Wheather</Menu.Item>
            </Menu>
          </Header>
          <Content style={{ padding: '0 50px', marginTop: 64 }}>
            <Index />
          </Content>
          <Footer style={{ textAlign: 'center' }}>React Wheather app using api.openweathermap.org</Footer>
        </Layout>
      </PersistGate>
    </Provider>
  );
}

export default App;
