//MoonSVG.js
import React from 'react';

export default class MoonSVG extends React.Component {
    render() {
        return (
            <svg
                className={this.props.className}
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    d="M0 7.45966C0 11.6241 3.24259 15 7.24251 15C10.3218 15 12.9523 12.9992 14 10.1783C13.1702 10.5841 12.2436 10.8109 11.2661 10.8109C7.71066 10.8109 4.82834 7.81011 4.82834 4.10839C4.82834 2.56026 5.33248 1.13471 6.17913 0C2.68335 0.5355 0 3.67132 0 7.45966Z"
                    fill="currentColor"
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                ></path>
            </svg>
        );
    }
}
