import React from 'react';
import './_Layout.scss';

export const Layout = (props: any) => {
  return (
    <div className="layout">
      <main className="layout__main">
        {props.children}
      </main>
    </div>
  );
};
