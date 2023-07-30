import { Document as ReactPDFDocument } from '@react-pdf/renderer';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import ErrorBoundary from './components/errors/ErrorBoundary.tsx';
import Provider from './contexts/Provider.tsx';
import './index.css';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  // <React.StrictMode>
  <ErrorBoundary>
    <ReactPDFDocument>
      <Provider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </Provider>
    </ReactPDFDocument>
  </ErrorBoundary>
  // </React.StrictMode>
)
