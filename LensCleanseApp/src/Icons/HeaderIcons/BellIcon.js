import React from 'react';

class BellIcon extends React.Component {

    render() {
        return (
            <svg className={this.props.className} width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M4.59538 13.3333L5.57872 12.3483C5.89372 12.0333 6.06705 11.615 6.06705 11.17V7.27248C6.06705 6.14165 6.55872 5.06082 7.41705 4.30915C8.28205 3.55082 9.38372 3.21748 10.5312 3.36832C12.4704 3.62582 13.9329 5.37915 13.9329 7.44748V11.17C13.9329 11.615 14.1062 12.0333 14.4204 12.3475L15.4045 13.3333H4.59538ZM11.6662 15.2842C11.6662 16.0333 10.9029 16.6667 9.99955 16.6667C9.09622 16.6667 8.33288 16.0333 8.33288 15.2842V15H11.6662V15.2842ZM17.1004 12.6733L15.5995 11.17V7.44748C15.5995 4.54665 13.5145 2.08248 10.7495 1.71665C9.14788 1.50332 7.53121 1.99248 6.31871 3.05582C5.09871 4.12415 4.40038 5.66082 4.40038 7.27248L4.39955 11.17L2.89871 12.6733C2.50788 13.065 2.39205 13.6475 2.60371 14.1583C2.81621 14.67 3.31038 15 3.86371 15H6.66621V15.2842C6.66621 16.9658 8.16121 18.3333 9.99955 18.3333C11.8379 18.3333 13.3329 16.9658 13.3329 15.2842V15H16.1354C16.6887 15 17.182 14.67 17.3937 14.1591C17.6062 13.6475 17.4912 13.0641 17.1004 12.6733Z" />
            <mask id="bell" mask-type="alpha" maskUnits="userSpaceOnUse" x="2" y="1" width="16" height="18">
            <path fillRule="evenodd" clipRule="evenodd" d="M4.59538 13.3333L5.57872 12.3483C5.89372 12.0333 6.06705 11.615 6.06705 11.17V7.27248C6.06705 6.14165 6.55872 5.06082 7.41705 4.30915C8.28205 3.55082 9.38372 3.21748 10.5312 3.36832C12.4704 3.62582 13.9329 5.37915 13.9329 7.44748V11.17C13.9329 11.615 14.1062 12.0333 14.4204 12.3475L15.4045 13.3333H4.59538ZM11.6662 15.2842C11.6662 16.0333 10.9029 16.6667 9.99955 16.6667C9.09622 16.6667 8.33288 16.0333 8.33288 15.2842V15H11.6662V15.2842ZM17.1004 12.6733L15.5995 11.17V7.44748C15.5995 4.54665 13.5145 2.08248 10.7495 1.71665C9.14788 1.50332 7.53121 1.99248 6.31871 3.05582C5.09871 4.12415 4.40038 5.66082 4.40038 7.27248L4.39955 11.17L2.89871 12.6733C2.50788 13.065 2.39205 13.6475 2.60371 14.1583C2.81621 14.67 3.31038 15 3.86371 15H6.66621V15.2842C6.66621 16.9658 8.16121 18.3333 9.99955 18.3333C11.8379 18.3333 13.3329 16.9658 13.3329 15.2842V15H16.1354C16.6887 15 17.182 14.67 17.3937 14.1591C17.6062 13.6475 17.4912 13.0641 17.1004 12.6733Z" />
            </mask>
            <g mask="url(#bell)">
            <rect width="20" height="20" />
            </g>
            </svg>
        );
    }
}

export default BellIcon;