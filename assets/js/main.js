// content.js(window.SITE)의 내용을 페이지에 그려 넣습니다.
// 내용 수정은 content.js에서 하세요. 이 파일은 보통 건드릴 필요가 없습니다.
(function () {
    var S = window.SITE;
    var $ = function (id) { return document.getElementById(id); };
    var VIDEO_EXT = /\.(mp4|webm|mov)$/i;

    function escapeAttr(s) {
        return String(s).replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
    }

    function icon(name) {
        return '<svg class="link-icon" aria-hidden="true"><use href="#icon-' + name + '"></use></svg>';
    }

    function linkList(links) {
        return (links || []).map(function (l) {
            return '<a href="' + escapeAttr(l.url) + '">' + l.label + '</a>';
        }).join(' &nbsp;|&nbsp; ');
    }

    // 저자 이름에서 *, † 같은 표기를 떼고 본인 이름인지 확인
    function isSelf(name) {
        var bare = name.replace(/[*†‡]/g, '').trim();
        return (S.profile.selfNames || []).indexOf(bare) !== -1;
    }

    function authorList(authors) {
        return authors.map(function (a) {
            if (typeof a === 'string') a = { name: a };
            var text = isSelf(a.name) ? '<span class="self">' + a.name + '</span>' : a.name;
            return a.url ? '<a href="' + escapeAttr(a.url) + '">' + text + '</a>' : text;
        }).join(', ');
    }

    // crop: 썸네일을 16:9로 잘라서 표시, focus: 잘릴 때 보일 위치 (CSS object-position, 예: "50% 70%")
    // poster: 영상이 로드되기 전에 보여줄 이미지
    function media(src, alt, crop, focus, poster) {
        if (!src) return '';
        var style = focus ? ' style="object-position: ' + escapeAttr(focus) + '"' : '';
        var inner = VIDEO_EXT.test(src)
            ? '<video src="' + escapeAttr(src) + '"' + style + (poster ? ' poster="' + escapeAttr(poster) + '"' : '') + ' autoplay muted loop playsinline preload="metadata"></video>'
            : '<img src="' + escapeAttr(src) + '" alt="' + escapeAttr(alt) + '"' + style + ' loading="lazy" data-zoom>';
        return '<div class="item-thumb' + (crop ? ' crop' : '') + '">' + inner + '</div>';
    }

    // ---------- Profile ----------
    var P = S.profile;
    document.title = P.name;
    $('name').textContent = P.name;
    $('photo').src = P.photo;
    $('photo').alt = 'Photo of ' + P.name;
    $('position').innerHTML = P.position.join('<br>');
    $('profile-links').innerHTML = P.links.map(function (l) {
        return '<a href="' + escapeAttr(l.url) + '">' + icon(l.icon) + l.label + '</a>';
    }).join('');

    $('bio').innerHTML = S.bio.map(function (p) { return '<p>' + p + '</p>'; }).join('');

    // ---------- News ----------
    var visible = S.newsVisible || S.news.length;
    $('news-list').innerHTML = S.news.map(function (n, i) {
        return '<li' + (i >= visible ? ' class="news-hidden" hidden' : '') + '>' +
            '<span class="date">[' + n.date + ']</span> ' + n.text + '</li>';
    }).join('');

    if (S.news.length > visible) {
        var toggle = $('news-toggle');
        var expanded = false;
        toggle.hidden = false;
        toggle.addEventListener('click', function () {
            expanded = !expanded;
            document.querySelectorAll('.news-hidden').forEach(function (li) { li.hidden = !expanded; });
            toggle.innerHTML = expanded ? 'Collapse &#9650;' : 'Show more &#9660;';
        });
    }

    // ---------- Publications ----------
    if (S.publications && S.publications.length) {
        $('pub-note').innerHTML = S.publicationNote || '';
        $('pub-list').innerHTML = S.publications.map(function (p) {
            // 제목·저자는 위, 학회·링크는 썸네일 아랫단에 맞춤
            return '<div class="item pub-item">' + media(p.media, p.title, false, null, p.poster) +
                '<div class="item-text' + (p.featured ? ' featured' : '') + '">' +
                '<div><p class="item-title">' + p.title + '</p>' +
                '<p>' + authorList(p.authors) + '</p>' +
                (p.note ? '<p class="item-note">' + p.note + '</p>' : '') + '</div>' +
                '<div class="item-bottom"><p><i>' + p.venue + '</i>' + (p.year ? ', ' + p.year : '') + '</p>' +
                (p.award ? '<p class="item-award">' + p.award + '</p>' : '') +
                (p.links && p.links.length ? '<p class="item-links">' + linkList(p.links) + '</p>' : '') +
                '</div></div></div>';
        }).join('');
    } else {
        $('publications').remove();
    }

    // ---------- Projects ----------
    if (S.projects && S.projects.length) {
        if (S.projectsTitle) document.querySelector('#projects h2').innerHTML = S.projectsTitle;
        $('project-list').innerHTML = S.projects.map(function (p) {
            return '<div class="item">' + media(p.media, p.title, true, p.mediaFocus, p.poster) +
                '<div class="item-text' + (p.featured ? ' featured' : '') + '">' +
                '<p class="item-title">' + p.title + '</p>' +
                (p.period ? '<p class="item-period">' + p.period + '</p>' : '') +
                (p.description
                    ? '<p class="item-desc">' + p.description + '</p>' +
                      '<button type="button" class="more-toggle" hidden>Show more &#9660;</button>'
                    : '') +
                (p.links && p.links.length ? '<p class="item-links">' + linkList(p.links) + '</p>' : '') +
                '</div></div>';
        }).join('');
        setupDescClamp($('project-list'));
    } else {
        $('projects').remove();
    }

    // ---------- Education ----------
    if (S.education && S.education.length) {
        $('edu-list').innerHTML = S.education.map(function (e) {
            return '<div class="edu-item">' +
                (e.logo ? '<div class="edu-logo"><img src="' + escapeAttr(e.logo) + '" alt="' + escapeAttr(e.school) + '"></div>' : '') +
                '<div class="edu-info">' +
                '<div class="edu-degree">' + e.degree + '</div>' +
                '<div>' + e.school + (e.period ? ' &nbsp;·&nbsp; <span class="edu-period">' + e.period + '</span>' : '') + '</div>' +
                (e.details || []).map(function (d) { return '<div class="edu-detail">' + d + '</div>'; }).join('') +
                '</div></div>';
        }).join('');
    } else {
        $('education').remove();
    }

    // 사진 옆 글이 사진보다 길면 설명을 줄 단위로 잘라 사진 높이에 맞추고 "Show more" 버튼을 보여줌
    function setupDescClamp(list) {
        var items = Array.prototype.filter.call(list.querySelectorAll('.item'), function (item) {
            return item.querySelector('.item-thumb') && item.querySelector('.item-desc');
        });

        function clamp(item) {
            var thumb = item.querySelector('.item-thumb');
            var text = item.querySelector('.item-text');
            var desc = item.querySelector('.item-desc');
            var btn = item.querySelector('.more-toggle');
            if (item.dataset.expanded === 'true') return;

            desc.classList.remove('clamped');
            desc.style.maxHeight = '';
            btn.hidden = true;

            // 모바일처럼 사진이 글 위에 쌓이는 배치에서는 자르지 않음
            var sideBySide = thumb.getBoundingClientRect().top === text.getBoundingClientRect().top;
            // 썸네일 칸은 글 높이만큼 늘어나므로, 칸이 아니라 사진 자체의 높이를 기준으로 삼음
            var thumbH = thumb.firstElementChild.getBoundingClientRect().height;
            if (!sideBySide || text.getBoundingClientRect().height <= thumbH) return;

            btn.hidden = false;
            var lineH = parseFloat(getComputedStyle(desc).lineHeight);
            var otherH = text.getBoundingClientRect().height - desc.getBoundingClientRect().height;
            var lines = Math.max(1, Math.floor((thumbH - otherH) / lineH));
            desc.style.maxHeight = lines * lineH + 'px';
            desc.classList.add('clamped');
        }

        items.forEach(function (item) {
            var btn = item.querySelector('.more-toggle');
            btn.addEventListener('click', function () {
                var expand = item.dataset.expanded !== 'true';
                item.dataset.expanded = expand;
                if (expand) {
                    var desc = item.querySelector('.item-desc');
                    desc.classList.remove('clamped');
                    desc.style.maxHeight = '';
                } else {
                    clamp(item);
                }
                btn.innerHTML = expand ? 'Collapse &#9650;' : 'Show more &#9660;';
            });
            var img = item.querySelector('.item-thumb img, .item-thumb video');
            if (img) img.addEventListener(img.tagName === 'IMG' ? 'load' : 'loadedmetadata', function () { clamp(item); });
        });

        function clampAll() { items.forEach(clamp); }
        clampAll();
        window.addEventListener('resize', clampAll);
        if (document.fonts) document.fonts.ready.then(clampAll);
    }

    // 모든 링크를 새 탭에서 열기 (이메일 링크와 페이지 내부 #링크는 제외)
    document.querySelectorAll('a[href]').forEach(function (a) {
        var href = a.getAttribute('href');
        if (/^(mailto:|#)/.test(href)) return;
        a.target = '_blank';
        a.rel = 'noopener';
    });

    $('last-updated').textContent = S.lastUpdated || document.lastModified.split(' ')[0];

    // ---------- Theme toggle ----------
    // 버튼으로 고른 테마는 저장되어 다음 방문에도 유지. 고른 적이 없으면 시스템 설정을 계속 따라감
    var root = document.documentElement;
    $('theme-toggle').addEventListener('click', function () {
        var next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        root.setAttribute('data-theme', next);
        try { localStorage.setItem('theme', next); } catch (e) {}
    });
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function (e) {
        var saved = null;
        try { saved = localStorage.getItem('theme'); } catch (err) {}
        if (!saved) root.setAttribute('data-theme', e.matches ? 'dark' : 'light');
    });

    // ---------- Image modal ----------
    var modal = $('modal');
    var modalImg = $('modal-img');
    function closeModal() { modal.classList.remove('open'); modal.setAttribute('aria-hidden', 'true'); }

    document.addEventListener('click', function (e) {
        if (e.target.matches('img[data-zoom]')) {
            modalImg.src = e.target.src;
            modalImg.alt = e.target.alt;
            modal.classList.add('open');
            modal.setAttribute('aria-hidden', 'false');
        } else if (modal.contains(e.target)) {
            closeModal();
        }
    });
    document.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeModal(); });
})();
