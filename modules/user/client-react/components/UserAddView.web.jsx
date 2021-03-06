import React from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { translate } from '@gqlapp/i18n-client-react';
import { PageLayout, Card } from '@gqlapp/look-client-react';
import settings from '@gqlapp/config';

import UserForm from './UserForm';

const UserAddView = ({ t, onSubmit }) => {
  const renderMetaData = () => (
    <Helmet
      title={`${settings.app.name} - ${t('userEdit.title')}`}
      meta={[
        {
          name: 'description',
          content: `${settings.app.name} - ${t('userEdit.meta')}`
        }
      ]}
    />
  );

  const renderContent = () => (
    <Card className="form-card">
      <Link to="/users">Back</Link>
      <h2>
        {t('userEdit.form.titleCreate')} {t('userEdit.form.title')}
      </h2>
      <UserForm onSubmit={onSubmit} initialValues={{}} shouldDisplayRole={true} shouldDisplayActive={true} />
    </Card>
  );

  return (
    <PageLayout type="forms">
      {renderMetaData()}

      {renderContent()}
    </PageLayout>
  );
};

UserAddView.propTypes = {
  t: PropTypes.func,
  onSubmit: PropTypes.func
};

export default translate('user')(UserAddView);
