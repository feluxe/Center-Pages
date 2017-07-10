import sys
import os
import shutil
from ompy.cli.styling import tags
# from ompy.app.utils import load_yaml
from ompy.cmdlib.utils import cmd_wrapper


# CWD = os.getcwd()
# CFG = load_yaml(CWD + '/CONFIG.yaml', keep_order=True)


def build_sequence() -> None:
    print(tags.h2('Build'))

    result = []

    zip_args = ('dist/page-aligner', 'zip', 'src')
    result.append(cmd_wrapper('Zip Files', shutil.make_archive, zip_args))

    print(tags.h3('Build Results'))
    for command in result:
        print(command.return_msg)


def execute() -> None:
    try:
        build_sequence()
    except KeyboardInterrupt:
        print('\n\nScript aborted by user. (KeyboardInterrupt)')
        sys.exit(1)


if __name__ == '__main__':
    execute()
