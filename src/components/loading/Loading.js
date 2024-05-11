import React from 'react'

export const Loading = () => {
    return (
        <>
            <div className="d-flex align-items-center">
                <strong>در حال دریافت اطلاعات...</strong>
                <div className="spinner-border ms-auto" role="status" aria-hidden="true"></div>
            </div>
        </>
    )
}
