import { Pagination } from 'antd'

const PagePagination = ({ nextPage, current, pages }) => {
  const onChange = (page) => {
    nextPage(page)
  }

  return <Pagination current={current} onChange={(page) => onChange(page)} total={pages * 5} showSizeChanger={false} />
}

export default PagePagination
