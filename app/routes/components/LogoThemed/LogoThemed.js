import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import { ThemeConsumer } from '../../../components/Theme';

const logos = {
    'primary': require('./../../../images/logos/alpherral.svg'),
    'emblem': require('./../../../images/logos/alpherral-emblem.svg')
}

const getLogo = (style, color, slim) => {
    if (slim) {
        return logos['emblem'];
    }
    return logos[color];
}

const getLogoUrl = (logo) => {
    return logo;
}

// Check for background
const getLogoUrlBackground = (style, color) => {
    if (style === 'color') {
        return logos['white'];
    } else {
        return getLogo(style, color);
    }
}

const LogoThemed = ({ checkBackground, logo, className, slim, ...otherProps }) => (
    <ThemeConsumer>
    {
        ({ style, color }) => (
            <img
                src={
                    logo ?
                        getLogoUrl(logo) :
                        getLogo(style, 'primary', slim)
                }
                className={ classNames('d-block', className) }
                alt="Alpherral Logo"
                style={ slim ? { maxWidth: '40px', margin: '0 auto' } : {} }
                { ...otherProps }
            />
        )
    }
    </ThemeConsumer>
);
LogoThemed.propTypes = {
    checkBackground: PropTypes.bool,
    className: PropTypes.string,
    slim: PropTypes.bool,
};

export { LogoThemed };
