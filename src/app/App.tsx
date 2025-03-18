import "../assets/styles/App.css";
import Header from "../components/header";
import WrapSearch from "../components/search";
import { ErrorBoundary } from 'react-error-boundary';

const ErrorFallback = ({ error }: { error: Error }) => (
  <div>
    <h2>Something went wrong: {error.message}</h2>
  </div>
);
function App() {

  return (
    <>
      <ErrorBoundary FallbackComponent={ErrorFallback}>
        <Header />
        <WrapSearch />
      </ErrorBoundary>
    </>
  );
}

export default App;
