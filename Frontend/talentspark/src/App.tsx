import Welcome from './components/Welcome';
import Navbar from './components/NavBar';
import Footer from './components/Footer';
import JobCard from './components/JobCard';
import CompanyCard from './components/CompanyCard';
import type {Company} from "./types/company";
import{useEffect, useState} from "react";
import {getCompanies} from "./Services/CompanyService";

function App() { 
  const [loading, setLoading] = useState(true);
  const [error,setError] = useState<Error | null>(null);
  const [companies, setCompanies] = useState<Company[]>([]);
  
  async function fetchCompanies() {
    setLoading(true);
    try {
      const companies = await getCompanies();
      setCompanies(companies);
    } catch (error) {
      setError(error as Error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchCompanies();
  }, []);

  if(error) {
    return <div>Error: {error.message}</div>;
  }

  if(loading) {
    return <div>Loading...</div>;
  }


  return (
      <>
        <Navbar />
        <Welcome />
        <JobCard />
        <CompanyCard key={companies.id} companies={companies} />
        <Footer />
      </>
  );
}

export default App;