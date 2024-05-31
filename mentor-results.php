<span id="starthere"></span>
<div id="search-results" class="page page--full-width mentor-listing" data-t4-ajax-group="courseSearch" role="main">
    <article class="listing-page">
        <section class="su-listing">
        <div class="grid-container">
            <div class="grid-x grid-margin-x">
            <?php if (!empty($results)) : ?>
                <?php foreach ($results as $item) : ?>
                    <div class="cell medium-6 large-4 global-margin--2x">
                    <article class="mentor-listing--item">
                        <div class="program-listing--img">
                        <?php if (!empty($item['photoUrl'])) : ?>
                            <img alt="Photo of <?php echo $item['firstName']; ?> <?php echo $item['lastName']; ?>" src="<?php echo $item['photoUrl']; ?>">
                        <?php endif; ?>
                        </div>
                        <div class="mentor-grid-margin-x">
                            <div class="program-listing--body">
                                <div class="program-listing--text-set__first text-margin-reset">
                                <h3 class="h4 funderline"><a href="<?php echo $item['link']; ?>"><?php echo $item['firstName']; ?> <?php echo $item['lastName']; ?></a></h3>
                                </div>
                                <div class="text-margin-reset">
                                    <p>
                                        <strong>Job Title: </strong><span class="jobTitle"><?php echo $item['jobTitle']; ?></span><br>
                                        <strong>Company: </strong><span class="company"><?php echo $item['company']; ?></span><br>
                                        <strong>Industry: </strong><span class="industry"><?php echo $item['industry']; ?></span><br>
                                        <strong>Mentor Since: </strong><span class="mentorSince"><?php echo $item['mentorSince']; ?></span><br>
                                        <strong>Will Mentor: </strong><span class="studentType"><?php echo implode(', ', explode('|', $item['studentType'])) ?></span>
                                    </p>
                                </div>
                            </div>
                        </div>
                    </article>
                </div>
                <?php endforeach; ?>

                <?php if (isset($paginationArray)) : ?>
                    <div class="pagination-box">
                        <div class="pagination-pages">
                            <nav aria-label="pagination" class="pagination" data-t4-ajax-link="normal" data-t4-scroll="true">
                                <?php foreach ($paginationArray as $paginationItem) : ?>
                                    <?php if ($paginationItem['current']) : ?>
                                        <span class="currentpage"><a href=""><?php echo $paginationItem['text']; ?></a></span>
                                    <?php else : ?>
                                        <a href="<?php echo $paginationItem['href']; ?>" class="<?php echo $paginationItem['class']; ?>">
                                        <?php echo $paginationItem['text']; ?>
                                        </a>
                                    <?php endif; ?>
                                <?php endforeach; ?>
                            </nav>
                        </div>
                    </div>
                <?php endif; ?>
            <?php else : ?>
                <p style="text-align: center; padding: 30px; font-weight: bold;">No Results Found</p>
            <?php endif; ?>
            </div>
        </div>
        </section>
    </article>
</div>


