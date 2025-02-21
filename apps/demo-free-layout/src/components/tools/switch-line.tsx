import { useCallback } from 'react'

import {
    usePlayground,
    useService,
    WorkflowLinesManager,
} from '@flowgram.ai/free-layout-editor'
import { IconButton, Tooltip } from '@douyinfe/semi-ui'

const icon = (
<svg width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <path id="path1" fill="#000000" stroke="none" d="M 12.728118 10.060962 C 13.064282 8.716098 14.272528 7.772551 15.65877 7.772343 L 17.689898 7.772343 C 18.0798 7.772343 18.39588 7.456264 18.39588 7.066362 C 18.39588 6.676458 18.0798 6.36038 17.689898 6.36038 L 15.659616 6.36038 C 13.62515 6.360315 11.851767 7.745007 11.358504 9.718771 C 11.02234 11.063635 9.814095 12.007183 8.427853 12.007389 L 7.101437 12.007389 C 6.711768 12.007389 6.395878 12.323277 6.395878 12.712947 C 6.395878 13.102616 6.711768 13.418506 7.101437 13.418506 L 8.426159 13.418506 C 9.812716 13.418323 11.021417 14.361954 11.357657 15.707124 C 11.850921 17.680887 13.624304 19.065578 15.65877 19.065516 L 17.689049 19.065516 C 18.078953 19.065516 18.395033 18.749435 18.395033 18.359533 C 18.395033 17.969631 18.078953 17.653551 17.689049 17.653551 L 15.65877 17.653551 C 14.272528 17.653345 13.064282 16.709797 12.728118 15.364932 C 12.454905 14.27114 11.774856 13.322707 10.826583 12.712947 C 11.774536 12.10303 12.454268 11.154617 12.727271 10.060962 Z"/>
</svg>
)

export const SwitchLine = () => {
    const playground = usePlayground()
    const linesManager = useService(WorkflowLinesManager)
    const switchLine = useCallback(() => {
        linesManager.switchLineType();
    }, [linesManager])

    if (playground.config.readonly) {
        return <></>
    }

    return (
        <Tooltip content={'Switch Line'}>
            <IconButton
        type="tertiary"
        theme="borderless" onClick={switchLine} icon={icon} />
        </Tooltip>
    )
}
