/**
 * btns
 */

import { PureComponent, createRef } from 'react'
import {
  Popover
} from 'antd'
import logoRef from '@electerm/electerm-resource/res/imgs/electerm.svg'
import { shortcutDescExtend } from '../shortcuts/shortcut-handler.js'
import MenuRender from './sys-menu.jsx'
import { refsStatic } from '../common/ref.js'

const e = window.translate
const logo = logoRef.replace(/^\//, '')

class MenuBtn extends PureComponent {
  constructor (props) {
    super(props)
    this.btnRef = createRef()
    this.state = {
      isDragging: false,
      isOpen: false,
      position: { x: window.innerWidth - 80, y: window.innerHeight - 130 }
    }
    this.dragStartPos = { x: 0, y: 0 }
    this.hasMoved = false
  }

  componentDidMount () {
    refsStatic.add('menu-btn', this)
    window.addEventListener('resize', this.handleResize)
  }

  componentWillUnmount () {
    window.removeEventListener('resize', this.handleResize)
    this.removeDragListeners()
  }

  handleResize = () => {
    // Keep button within window bounds on resize
    this.setState(prevState => {
      const { x, y } = prevState.position
      const maxX = window.innerWidth - 60
      const maxY = window.innerHeight - 60
      return {
        position: {
          x: Math.min(Math.max(20, x), maxX),
          y: Math.min(Math.max(20, y), maxY)
        }
      }
    })
  }

  handleMouseDown = (e) => {
    if (!this.props.isFloating) return
    e.preventDefault() // prevent text selection
    this.hasMoved = false
    this.dragStartPos = {
      x: e.clientX - this.state.position.x,
      y: e.clientY - this.state.position.y
    }
    this.setState({ isDragging: true })
    
    document.addEventListener('mousemove', this.handleMouseMove)
    document.addEventListener('mouseup', this.handleMouseUp)
  }

  handleMouseMove = (e) => {
    if (!this.state.isDragging) return
    
    // Threshold to distinguish click from drag
    this.hasMoved = true

    let newX = e.clientX - this.dragStartPos.x
    let newY = e.clientY - this.dragStartPos.y

    // Boundary constraints
    const maxX = window.innerWidth - 60
    const maxY = window.innerHeight - 60
    newX = Math.min(Math.max(20, newX), maxX)
    newY = Math.min(Math.max(20, newY), maxY)

    this.setState({
      position: { x: newX, y: newY }
    })
  }

  handleMouseUp = (e) => {
    this.setState({ isDragging: false })
    this.removeDragListeners()

    // Magnetic snap to screen edges
    const { x, y } = this.state.position
    const snapThreshold = 30
    const maxX = window.innerWidth - 60
    const maxY = window.innerHeight - 60

    let snappedX = x
    let snappedY = y

    if (x < snapThreshold) snappedX = 20
    if (x > maxX - snapThreshold) snappedX = maxX
    if (y < snapThreshold) snappedY = 20
    if (y > maxY - snapThreshold) snappedY = maxY

    if (snappedX !== x || snappedY !== y) {
      // Force a slight delay to allow the CSS transition to apply
      setTimeout(() => {
        this.setState({ position: { x: snappedX, y: snappedY } })
      }, 0)
    }
  }

  removeDragListeners = () => {
    document.removeEventListener('mousemove', this.handleMouseMove)
    document.removeEventListener('mouseup', this.handleMouseUp)
  }

  openMenu = (e) => {
    if (this.hasMoved) {
      e.stopPropagation()
      e.preventDefault()
      return
    }
  }

  handleOpenChange = (newOpen) => {
    if (this.hasMoved) {
      return
    }
    this.setState({ isOpen: newOpen })
  }

  onNewSsh = () => {
    window.store.onNewSsh()
  }

  addTab = () => {
    window.store.addTab()
  }

  openAbout = () => {
    window.store.openAbout()
  }

  openSetting = () => {
    window.store.openSetting()
  }

  openDevTools = () => {
    window.pre.runGlobalAsync('openDevTools')
  }

  minimize = () => {
    window.pre.runGlobalAsync('minimize')
  }

  maximize = () => {
    window.pre.runGlobalAsync('maximize')
  }

  reload = () => {
    window.location.reload()
  }

  onCheckUpdate = () => {
    window.store.onCheckUpdate()
  }

  restart = () => {
    window.store.restart()
  }

  close = () => {
    window.store.exit()
  }

  renderContext = () => {
    const items = [
      {
        func: 'onNewSsh',
        icon: 'CodeFilled',
        text: e('newBookmark'),
        subText: this.getShortcut('app_newBookmark')
      }
    ]
    if (window.store.hasNodePty) {
      items.push({
        func: 'addTab',
        icon: 'RightSquareFilled',
        text: e('newTab'),
        subText: this.getShortcut('app_newTab')
      })
    }
    // {
    //   type: 'hr'
    // },
    items.push({
      noCloseMenu: true,
      icon: 'BookOutlined',
      text: e('bookmarks'),
      submenu: 'Bookmark'
    })
    items.push(
      {
        noCloseMenu: true,
        icon: 'ClockCircleOutlined',
        text: e('history'),
        submenu: 'History'
      },
      {
        noCloseMenu: true,
        icon: 'BarsOutlined',
        text: e('sessions'),
        submenu: 'Tabs'
      },
      {
        icon: 'AppstoreOutlined',
        text: e('layout'),
        submenu: 'Layout'
      },
      // {
      //   type: 'hr'
      // },
      {
        func: 'openAbout',
        icon: 'InfoCircleOutlined',
        text: e('about')
      },
      {
        func: 'openSetting',
        icon: 'SettingOutlined',
        text: e('settings')
      },
      {
        func: 'openDevTools',
        icon: 'LeftSquareFilled',
        text: e('toggledevtools')
      },
      // {
      //   type: 'hr'
      // },
      {
        module: 'Zoom'
      },
      {
        func: 'minimize',
        icon: 'SwitcherFilled',
        text: e('minimize')
      },
      {
        func: 'maximize',
        icon: 'LayoutFilled',
        text: e('maximize')
      },
      {
        func: 'reload',
        icon: 'ReloadOutlined',
        text: e('reload')
      },
      // {
      //   type: 'hr'
      // },
      {
        func: 'onCheckUpdate',
        icon: 'UpCircleOutlined',
        text: e('checkForUpdate')
      },
      // {
      //   type: 'hr'
      // },
      {
        func: 'restart',
        icon: 'RedoOutlined',
        text: e('restart')
      },
      {
        func: 'close',
        icon: 'CloseOutlined',
        text: e('close')
      }
    )
    return items
  }

  renderMenu () {
    const { store } = window
    const rprops = {
      items: this.renderContext(),
      tabs: store.getTabs(),
      config: store.config,
      history: store.history
    }
    return (
      <MenuRender {...rprops} />
    )
  }

  render () {
    const { isFloating } = this.props
    const { isDragging, position, isOpen } = this.state
    
    const className = `menu-control ${isFloating ? 'floating-menu-btn' : ''} ${isDragging ? 'dragging' : ''}`
    
    const pops = {
      className,
      onMouseDown: this.handleMouseDown,
      onClick: this.openMenu,
      title: e('menu'),
      style: isFloating ? {
        left: `${position.x}px`,
        top: `${position.y}px`
      } : {}
    }
    const popProps = {
      content: this.renderMenu(),
      open: isOpen,
      onOpenChange: this.handleOpenChange,
      placement: 'topRight',
      trigger: ['click']
    }
    return (
      <Popover {...popProps}>
        <div
          {...pops}
        >
          <img src={logo} width={28} height={28} />
        </div>
      </Popover>
    )
  }
}

export default shortcutDescExtend(MenuBtn)
