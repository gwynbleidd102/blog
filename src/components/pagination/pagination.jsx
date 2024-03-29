import React, { useState } from 'react'
import { Pagination } from 'antd'

const PagePagination = ({ nextPage, pages }) => {
  const [current, setCurrent] = useState(1)

  const onChange = (page) => {
    setCurrent(page)
    nextPage(page)
  }

  return <Pagination current={current} onChange={(page) => onChange(page)} total={pages * 5} showSizeChanger={false} />
}

export default PagePagination
