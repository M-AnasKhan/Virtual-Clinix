import { useEffect, useRef } from 'react'

const JitsiMeet = ({ roomUrl, displayName, role }) => {
  const jitsiRef = useRef(null)
  const apiRef   = useRef(null)

  useEffect(() => {
    if (!roomUrl || !window.JitsiMeetExternalAPI) return

    const domain  = 'meet.jit.si'
    const roomName = roomUrl.replace('https://meet.jit.si/', '')

    const options = {
      roomName,
      width:  '100%',
      height: '100%',
      parentNode: jitsiRef.current,
      userInfo: {
        displayName: displayName || (role === 'doctor' ? 'Doctor' : 'Patient'),
      },
      configOverwrite: {
        startWithAudioMuted:   false,
        startWithVideoMuted:   false,
        disableDeepLinking:    true,
        enableWelcomePage:     false,
        prejoinPageEnabled:    false,
        disableInviteFunctions: true,
        toolbarButtons: [
          'microphone', 'camera', 'closedcaptions',
          'fullscreen', 'fodeviceselection', 'hangup',
          'chat', 'recording', 'settings', 'raisehand',
          'videoquality', 'tileview',
        ],
      },
      interfaceConfigOverwrite: {
        SHOW_JITSI_WATERMARK:       false,
        SHOW_WATERMARK_FOR_GUESTS:  false,
        SHOW_BRAND_WATERMARK:       false,
        BRAND_WATERMARK_LINK:       '',
        SHOW_POWERED_BY:            false,
        DISPLAY_WELCOME_FOOTER:     false,
        MOBILE_APP_PROMO:           false,
        APP_NAME:                   'Virtual Clinix',
        NATIVE_APP_NAME:            'Virtual Clinix',
        DEFAULT_BACKGROUND:         '#0F172A',
        TOOLBAR_ALWAYS_VISIBLE:     false,
      },
    }

    apiRef.current = new window.JitsiMeetExternalAPI(domain, options)

    return () => {
      if (apiRef.current) apiRef.current.dispose()
    }
  }, [roomUrl, displayName])

  return (
    <div ref={jitsiRef} className="w-full h-full rounded-xl overflow-hidden" />
  )
}

export default JitsiMeet