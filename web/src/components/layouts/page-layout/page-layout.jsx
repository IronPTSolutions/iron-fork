
import React from 'react'
import Jumbotron from '../../ui/jumbotron/jumbotron';

function PageLayout({ children, withJumbo, jumboTitle, jumboBackground }) {
  return (
    <div>
      {withJumbo && (<Jumbotron title={jumboTitle} backgroundImage={jumboBackground} />)}
      <div className="container my-4">{children}</div>
    </div>
  )
}

export default PageLayout;