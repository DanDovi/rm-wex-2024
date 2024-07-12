import React from 'react'

import styles from './contentContainer.module.css'

interface IContentContainerProps extends React.PropsWithChildren {
  title: string,
}

const ContentContainer: React.FC<IContentContainerProps> = ({title, children}) => {
  return (
    <div className={styles.contentContainer}>
      <h1>{title}</h1>
      <div className={styles.content}>{children}</div>
    </div>
  )
}

export default ContentContainer