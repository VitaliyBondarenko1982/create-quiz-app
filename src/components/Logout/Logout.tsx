import React, { FC, useEffect } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { logout as logoutAction } from '../../store/actions/authAction';

interface DispatchProps {
  logout: () => void;
}
const LogoutTemplate: FC<DispatchProps> = ({ logout }) => {
  useEffect(() => {
    logout();
  }, [logout]);

  return (
    <Redirect to="/" />
  );
};

const mapDispatchToProps = {
  logout: logoutAction,
};

export const Logout = connect(null, mapDispatchToProps)(LogoutTemplate);
