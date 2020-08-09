import React from 'react';

export const  Layout = (props: any) => {
  return (
    <div className="layout">
      <main className="layout__main">
        {props.children}
      </main>
    </div>
  )
}
