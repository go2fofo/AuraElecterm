/*
 * @Author: fofo
 * @Date: 2026-05-20 15:46:50
 * @LastEditTime: 2026-05-21 10:30:21
 * @LastEditors: fofo
 * @Description: 
 * @FilePath: /AuraElecterm/src/client/components/sys-menu/history.jsx
 */
import HistoryItem from '../sidebar/history-item'


export default function HistorySubMenu (props) {
  const { history = [] } = props
  return (
    <div className='sub-context-menu'>
      {
        history.length > 0
          ? history.map(item => {
            return (
              <HistoryItem key={item.id} item={item} />
            )
          })
          : <div className='pd2 text-center gray'>暂无历史</div>
      }
    </div>
  )
}
