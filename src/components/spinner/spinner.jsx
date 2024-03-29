import React from 'react'
import { LoadingOutlined } from '@ant-design/icons'
import { Spin } from 'antd'

import styles from './spinner.module.scss'

const Spinner = () => (
  <Spin
    className={styles.spinner}
    indicator={
      <LoadingOutlined
        style={{
          fontSize: 24,
        }}
        spin
      />
    }
  />
)

export default Spinner
