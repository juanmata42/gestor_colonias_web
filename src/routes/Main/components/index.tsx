import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { App } from '../../../models/app';
import { MainpageLang } from '../../../models/lang';
import { User, UserPermission } from '../../../models/user';
import AppButtonSelector from './appButtonSelector';
import newsImg from '../../../assets/news.svg';
import { logoutAction } from '../../../store/session/actions';

interface Props {
  literals: MainpageLang;
  user: User;
  getFactories: () => void;
  getAllApps: () => void;
  apps: App[] | [];
}

const Main: React.FC<Props> = ({
  literals, user, getFactories, getAllApps, apps,
}) => {
  const mountedRef = useRef<boolean | null>(null);
  const dispatch = useDispatch();
  const [appsList, setAppsList] = useState<App[]>([]);
  const [userApps, setUserApps] = useState<UserPermission[]>([]);

  useEffect(() => {
    mountedRef.current = true;
    getFactories();
    getAllApps();

    return () => {
      mountedRef.current = false;
    };
  }, []);

  const filterAndSortApps = (): App[] => {
    const finalApps = apps.filter((app) => app.parent_app_id === 'Dashboard');
    const adminApp = finalApps.find((app) => app.id === 'Admin');
    const iloApp = finalApps.find((app) => app.id === 'ILO');

    if (iloApp) {
      finalApps.splice(finalApps.indexOf(iloApp), 1);
      finalApps.push(iloApp);
    }
    if (adminApp) {
      finalApps.splice(finalApps.indexOf(adminApp), 1);
      finalApps.push(adminApp);
    }

    return finalApps;
  };

  useEffect(() => {
    if (apps.length > 0) {
      const appIDs = apps.map((app) => app.id);
      if (appIDs.includes('Dashboard')) {
        const finalApps = filterAndSortApps();
        setAppsList(finalApps);
      } else {
        dispatch(logoutAction());
      }
    }
  }, [apps]);

  useEffect(() => {
    if (user.appPermissions) {
      setUserApps(user.appPermissions.filter((app) => app.parent_app_id === 'Dashboard'));
    }
  }, [user]);

  return (
    <div className='main__apps-container'>
      <NavLink className='appButtonSelector' to='/alertsnews'>
        <div className='appButtonSelector__img-container'>
          <img src={newsImg} className='appButtonSelector__img' alt={`${literals.alerts} ${literals.and} ${literals.news}`} />
        </div>
        <div className='appButtonSelector__title-container'>
          <h2 className='appButtonSelector__title'>
            <span>{literals.alerts}</span>
            {' '}
            {literals.and}
            {' '}
            <span>{literals.news}</span>
          </h2>
        </div>
      </NavLink>
      {user.appPermissions?.length && appsList.length > 0 && appsList.map((app) => (
        <AppButtonSelector app={app} literals={literals} key={app.id} />
      ))}
    </div>
  );
};

Main.displayName = 'Main';

export default Main;
