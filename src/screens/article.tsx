import { css } from '@emotion/css'
import { FC } from 'react'
import { Link } from 'react-router-dom'
import { IArticle } from 'utils/types'
import './article.css'
const Article: FC<IArticle> = (article: IArticle) => {
  return (
    <>
      <section className="featured">
        <img className="featured-image" src={article.image_url} alt="Leopard" />
        <div>
          <p className="featured-title">
            Featured Animal <Link to="/id=234324">{article.title}</Link>
          </p>
          <article className="featured-article">
            {article.body}
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestiae
            neque tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde. Lorem ipsum dolor sit, amet consectetur
            adipisicing elit. Molestiae neque tempore error ratione aut
            recusandae dicta incidunt numquam repudiandae voluptatem, minima nam
            aperiam quo, eos sequi pariatur aliquam, eius unde. Lorem ipsum
            dolor sit, amet consectetur adipisicing elit. Molestiae neque
            tempore error ratione aut recusandae dicta incidunt numquam
            repudiandae voluptatem, minima nam aperiam quo, eos sequi pariatur
            aliquam, eius unde.
          </article>
          <Link to="/some">Read more</Link>
        </div>
      </section>
      <div
        className={css({
          borderBottom: '1px solid #cbd5ff',
          width: '100%',
          margin: '1em auto',
          height: 'auto',
          padding: '0.6em',
          display: 'block',
          boxShadow: '0 6px 3px -5px rgba(0, 0, 0, 0.2)',

          '@media screen and (min-width:600px)': {
            borderBottom: 'none',
            boxShadow: 'none',
          },
        })}
      ></div>
    </>
  )
}

export default Article
