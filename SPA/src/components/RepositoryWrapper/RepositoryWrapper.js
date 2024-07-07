import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import RepositoryCard from '../RepositoryCard/RepositoryCard'
import Button from '../Button/Button'
import arrow from '../../images/arrow.svg'

const RepositoryWrapper = () => {
  
  const { identifier } = useParams();
  const navigate = useNavigate();
  const [repo, setRepo] = useState({});

  const fetchRepositoryByIdentifier = async (identifier) => {
    try {
      const response = await axios(`https://github-trending-repositories-phi.vercel.app/repositories/${identifier}`);
      setRepo(response.data);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  };

  const goToHome = () => {
    navigate('/repositories');
  };  

  useEffect(() => {
    fetchRepositoryByIdentifier(identifier)
      .catch(err => {
        console.log(err);
        navigate('/repositories'); 
      });
  }, [identifier, navigate]);

  return (
    <div>
      <Button onClick={goToHome} src={arrow} alt={'стрелка назад'}/>
      <RepositoryCard repo={repo} />
    </div>
  )
};

export default RepositoryWrapper;