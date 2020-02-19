import React from 'react';
import { Link as PrismicLink, RichText } from 'prismic-reactjs'
import { Link } from 'gatsby';
import {linkResolver} from '../utils/linkResolver';

const htmlSerializer = (type, element, content, children, index) => {
    // Generate links to Prismic Documents as <Link> components
    if (type === 'hyperlink') {
        let result = ''
        const url = PrismicLink.url(element.data, linkResolver)
        if (element.data.link_type === 'Document') {
            result = <Link to={ url } key={ index }>{ content }</Link>
        } else {
            const target = element.data.target ? { 'target':element.data.target, 'rel':'noopener' } : {}
            result = <a href={ url } { ...target } key={ index }>{ content }</a>
        }
        return result
    }

    // If the image is also a link to a Prismic Document, it will return a <Link> component
    if (type === 'image') {
        let result = <img src={ element.url } alt={ element.alt || '' } copyright={ element.copyright || '' } />

        if (element.linkTo) {
        const url = PrismicLink.url(element.linkTo, linkResolver)

        if (element.linkTo.link_type === 'Document') {
            result = <Link to={ url } key={ index }>{ result }</Link>
        } else {
            const target = element.linkTo.target ? { 'target':element.linkTo.target, 'rel':'noopener' } : {}
            result = <a href={ url } { ...target }>{ result }</a>
        }
    }
    const wrapperClassList = [element.label || '', 'block-img'];
    result = <p className={ wrapperClassList.join(' ') } key={ index }>{result}</p>
    return result;
}

  // Return null to stick with the default behavior for everything else
  return null;
};

const RichTextCustom = ({render}) => {
    return (
        <RichText 
            render={render} 
            linkResolver={linkResolver} 
            htmlSerializer={htmlSerializer} />
    );
}

export default RichTextCustom;