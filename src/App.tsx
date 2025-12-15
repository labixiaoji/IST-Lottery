import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/common/Layout';
import { LotteryPage } from './components/lottery/LotteryPage';
import { ConfigPage } from './components/config/ConfigPage';

function App() {
  return (
    <Layout>
      <Routes>
        <Route path="/" element={<LotteryPage />} />
        <Route path="/config" element={<ConfigPage />} />
      </Routes>
    </Layout>
  );
}

export default App;
