/*
 * @Author: fofo
 * @Date: 2026-05-20 15:46:50
 * @LastEditTime: 2026-05-20 17:42:47
 * @LastEditors: fofo
 * @Description:
 * @FilePath: /AuraElecterm/src/client/components/sidebar/history.jsx
 */
/**
 * history select
 */

import React, { useState, useEffect } from 'react'
import { auto } from 'manate/react'
import { Switch } from 'antd'
import { UnorderedListOutlined } from '@ant-design/icons'
import HistoryItem from './history-item'
import { getItemJSON, setItemJSON } from '../../common/safe-local-storage.js'
import '../setting-panel/list.styl'

const SORT_BY_FREQ_KEY = 'electerm-history-sort-by-frequency'

export default auto(function HistoryPanel (props) {
  const { store } = window
  const [sortByFrequency, setSortByFrequency] = useState(() => {
    return getItemJSON(SORT_BY_FREQ_KEY, false)
  })

  useEffect(() => {
    setItemJSON(SORT_BY_FREQ_KEY, sortByFrequency)
  }, [sortByFrequency])

  const {
    history
  } = store
  let arr = store.config.disableConnectionHistory ? [] : history
  if (sortByFrequency) {
    arr = [...arr].sort((a, b) => { return b.count - a.count })
  }

  const handleSortByFrequencyChange = (checked) => {
    setSortByFrequency(checked)
  }

  const handleClearHistory = () => {
    store.clearHistory()
  }
  const e = window.translate
  const switchProps = {
    checkedChildren: e('sortByFrequency'),
    unCheckedChildren: e('sortByFrequency'),
    checked: sortByFrequency,
    onChange: handleSortByFrequencyChange,
    size: 'small'
  }
  const clearIconProps = {
    className: 'history-clear-icon pointer clear-ai-icon icon-hover',
    title: window.translate('clear'),
    onClick: handleClearHistory
  }
  return (
    <div
      className='sidebar-panel-history'
    >
      <div className='history-header pd2x pd2b'>
        <span className='w500'>{e('history')}</span>
        <div style={{ marginLeft: 'auto' }}>
          <Switch
            {...switchProps}
            className='mg1r'
          />
          <UnorderedListOutlined
            {...clearIconProps}
          />
        </div>
      </div>
      <div className='history-body'>
        {
          arr.map((item, i) => {
            return (
              <HistoryItem
                key={item.id}
                item={item}
              />
            )
          })
        }
      </div>
    </div>
  )
})
