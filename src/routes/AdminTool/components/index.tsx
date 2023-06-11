import React, { useEffect, useRef, useState } from 'react';
import { NavLink } from 'react-router-dom';
import userManagementIcon from '../../../assets/user-list.svg';
import interventionsIcon from '../../../assets/intervention.svg';
import './styles.scss';
import { adminToolLang } from '../../../models/lang';
import { User, UserPermission } from '../../../models/user';
import { App } from '../../../models/app';
import RouteHeader from '../../../components/RouteSimpleHeader';

interface adminToolProps {
  // eslint-disable-next-line no-unused-vars
  literals: adminToolLang;
  user: User;
  apps: App[];
  getAllApps: () => void;
}

const AdminTool: React.FC<adminToolProps> = ({
  literals, user, getAllApps, apps,
}) => {
  const [appsList, setAppsList] = useState<App[]>([]);
  const mountedRef = useRef<boolean>(true);

  useEffect(() => {
    mountedRef.current = true;
    getAllApps();
    return () => {
      mountedRef.current = false;
    };
  }, []);

  useEffect(() => {
    if (user.appPermissions && user.appPermissions.length > 0) {
      if (apps.length > 0) {
        const appList = apps
          .filter((app) => app.parent_app_id === 'Admin')
          .map((app) => {
            if (user.appPermissions?.find((permission: UserPermission) => permission.app_id === app.id)) {
              if (app.id === 'UserManagement') {
                return {
                  ...app,
                  img: userManagementIcon,
                  description: literals.userManagementPanelDescription,
                };
              }
              if (app.id === 'Interventions') {
                return {
                  ...app,
                  img: interventionsIcon,
                  description: literals.interventionsDescription,
                };
              }
            }
            return app;
          });

        setAppsList(appList);
      }
    }
  }, [apps, user]);

  return (
    <section className='adminTool__body'>
      <RouteHeader title={literals.title} subtitle={`${literals.hello} ${user.name} ${user.lastname}`} />
      <section className='adminTool__body__content'>
        {appsList.length > 0
          && appsList.map((app) => (
            <NavLink key={app.id} className='adminTool-Selector' to={`admin/${app.route_patients_page}`}>
              <div className='adminTool-Selector__img-container'>
                <img src={app.img} className='adminTool-Selector__img' alt={app.i18nApp[0].short_header} />
              </div>
              <div className='adminTool-Selector__title-container'>
                <h2 className='adminTool-Selector__title'>{app.i18nApp[0].short_header}</h2>
                <h3 className='adminTool-Selector__subtitle'>{app.description}</h3>
              </div>
            </NavLink>
          ))}
      </section>
    </section>
  );
};

AdminTool.displayName = 'AdminTool';

export default AdminTool;
