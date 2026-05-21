/*
 * @Author: fofo
 * @Date: 2026-05-20 15:46:50
 * @LastEditTime: 2026-05-20 16:39:04
 * @LastEditors: fofo
 * @Description: 
 * @FilePath: /AuraElecterm/src/client/components/sidebar/transfer-list.jsx
 */
import { auto } from 'manate/react'
import {
  SwapOutlined
} from '@ant-design/icons'
import {
  Badge,
  Popover
} from 'antd'
import TransferModal from './transfer-modal'
import './transfer.styl'

const e = window.translate

export default auto(function TransferList (props) {
  const {
    fileTransfers,
    transferTab,
    transferHistory
  } = window.store
  const len = fileTransfers.length
  if (!len && !transferHistory.length) {
    return null
  }
  const color = fileTransfers.some(item => item.error) ? 'red' : 'green'
  const bdProps = {
    count: len,
    size: 'small',
    offset: [-10, -5],
    color,
    overflowCount: 99
  }
  const transferModalProps = {
    fileTransfers,
    transferHistory,
    transferTab
  }
  const popProps = {
    placement: 'right',
    destroyOnHidden: true,
    overlayClassName: 'transfer-list-card',
    content: <TransferModal {...transferModalProps} />
  }
  return (
    <div
      className='control-icon-wrap'
      title={e('fileTransfers')}
    >
      <Popover
        {...popProps}
      >
        <Badge
          {...bdProps}
        >
          <SwapOutlined
            className='iblock font20 control-icon'
          />
        </Badge>
      </Popover>
    </div>
  )
})
