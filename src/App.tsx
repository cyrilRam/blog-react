import React from 'react';
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import ListPost from "./pages/ListPost";
import CreationPost from "./pages/CreationPost";
import Navigation from "./components/Navigation";
import {QueryClient, QueryClientProvider} from 'react-query';

const queryClient = new QueryClient();

const App: React.FC = () => {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Navigation/>
                <Routes>
                    <Route path="*" element={<ListPost/>}/>
                    <Route path="/creation" element={<CreationPost/>}/>
                </Routes>
            </Router>
        </QueryClientProvider>
    );
};

export default App;