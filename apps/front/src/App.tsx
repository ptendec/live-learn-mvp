import { useState } from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { Index } from "./pages";
import { trpc } from "./utils/trpc";
import { store } from "./store";
import { Provider } from "react-redux";

function App() {
  const [queryClient] = useState(() => new QueryClient());
  const [trpcClient] = useState(() =>
    trpc.createClient({
      url: "http://localhost:3000/api",
    })
  );
  return (
    <Provider store={store}>
      <trpc.Provider client={trpcClient} queryClient={queryClient}>
        <QueryClientProvider client={queryClient}>
          <Index />
        </QueryClientProvider>
      </trpc.Provider>
    </Provider>
  );
}
export default App;
