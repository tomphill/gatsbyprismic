import React from "react"
import { graphql } from "gatsby"
import RichText from "../components/richText"
import Layout from "../components/layout"
import SliceZone from "../components/sliceZone"
import styled from "styled-components"

export const query = graphql`
  query PageQuery($id: String) {
    prismic {
      allPages(id: $id) {
        edges {
          node {
            body {
              ... on PRISMIC_PageBodyCall_to_action_grid2 {
                type
                label
                primary {
                  section_title
                }
                fields {
                  button_destination {
                    ... on PRISMIC_Contact_page {
                      _meta {
                        uid
                      }
                    }
                  }
                  button_label
                  call_to_action_title
                  content
                  featured_image
                  featured_imageSharp {
                    childImageSharp {
                      fixed {
                        ...GatsbyImageSharpFixed
                      }
                    }
                  }
                }
              }
            }
            content
            page_title
            _meta {
              id
              uid
            }
          }
        }
      }
    }
  }
`

const PageWrapper = styled.section`
  max-width: 800px;
  margin: 0 auto;
`

const Page = props => {
  const pageTitle = props.data.prismic.allPages.edges[0].node.page_title
  const content = props.data.prismic.allPages.edges[0].node.content

  return (
    <Layout>
      <PageWrapper>
        <RichText render={pageTitle} />
        <RichText render={content} />
        {!!props.data.prismic.allPages.edges[0].node.body && (
          <SliceZone body={props.data.prismic.allPages.edges[0].node.body} />
        )}
      </PageWrapper>
    </Layout>
  )
}

export default Page
