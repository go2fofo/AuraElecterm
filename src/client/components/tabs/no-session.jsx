import { Dropdown } from 'antd'
import { auto } from 'manate/react'
import {
  RobotOutlined,
  BookOutlined,
  SettingOutlined,
  PictureOutlined,
  CloudSyncOutlined,
  AppstoreOutlined,
  InfoCircleOutlined,
  PlusCircleOutlined
} from '@ant-design/icons'
import LogoElem from '../common/logo-elem.jsx'
import HistoryPanel from '../sidebar/history'
import QuickConnect from './quick-connect'
import { settingMap } from '../../common/constants'
import './no-session.styl'

const e = window.translate

export default auto(function NoSessionPanel ({ height, onNewTab, onNewSsh, batch }) {
  const props = {
    style: {
      height: height + 'px'
    }
  }
  const handleClick = () => {
    window.openTabBatch = batch
  }

  const handleCreateAIBookmark = () => {
    window.store.onNewSshAI()
  }

  const { store } = window
  const {
    openSetting,
    openAbout,
    openSettingSync,
    openTerminalThemes,
    openWidgetsModal,
    bookmarks
  } = store

  const openBookmarks = () => {
    store.settingTab = settingMap.bookmarks
    store.openSetting()
  }

  const cards = [
    {
      icon: <BookOutlined />,
      title: e(settingMap.bookmarks),
      onClick: openBookmarks
    },
    {
      icon: <SettingOutlined />,
      title: e(settingMap.setting),
      onClick: openSetting
    },
    {
      icon: <PictureOutlined />,
      title: e(settingMap.terminalThemes),
      onClick: openTerminalThemes
    },
    {
      icon: <CloudSyncOutlined />,
      title: e('settingSync'),
      onClick: openSettingSync
    },
    {
      icon: <AppstoreOutlined />,
      title: e('widgets'),
      onClick: openWidgetsModal
    },
    {
      icon: <InfoCircleOutlined />,
      title: e('about'),
      onClick: openAbout
    }
  ]

  const items = [
    {
      key: 'default',
      label: e('newTab'),
      icon: <PlusCircleOutlined />,
      onClick: onNewTab
    },
    {
      key: 'bookmark',
      label: e('newBookmark'),
      icon: <PlusCircleOutlined />,
      onClick: onNewSsh
    },
    {
      type: 'divider'
    },
    ...(bookmarks || []).map((b, i) => ({
      key: `bookmark-${b.id || i}`,
      label: b.title || b.host || 'Unknown',
      icon: <BookOutlined />,
      onClick: () => store.addTab({ ...b, batch })
    }))
  ]

  const dropdownProps = {
    menu: {
      items,
      style: {
        maxHeight: '300px',
        overflowY: 'auto'
      }
    },
    placement: 'bottom'
  }

  return (
    <div className='no-sessions electerm-logo-bg' {...props}>
      <div className='pd3'>
        <LogoElem />
      </div>

      <div className='home-quick-connect pd2'>
        <QuickConnect batch={batch} inputOnly />
      </div>

      <div className='home-cards-container'>
        <Dropdown {...dropdownProps}>
          <div className='home-card'>
            <div className='home-card-icon'><PlusCircleOutlined /></div>
            <div className='home-card-title'>{e('新增')}</div>
          </div>
        </Dropdown>
        {cards.map((card, i) => {
          const handleCardClick = card.onClick
          return (
            <div className='home-card' key={i} onClick={handleCardClick}>
              <div className='home-card-icon'>{card.icon}</div>
              <div className='home-card-title'>{card.title}</div>
            </div>
          )
        })}
        <div className='home-card' onClick={handleCreateAIBookmark}>
          <div className='home-card-icon'><RobotOutlined /></div>
          <div className='home-card-title'>{e('createBookmarkByAI')}</div>
        </div>
      </div>

      <div className='no-session-history' onClick={handleClick}>
        <HistoryPanel sort />
      </div>
    </div>
  )
})
