'use client';

import { useState } from 'react';
import Link from 'next/link';
import * as HoverCard from '@radix-ui/react-hover-card';
import { ArrowRightIcon } from 'lucide-react';
import { twMerge } from 'tailwind-merge';

import { useDebounce } from '@/hooks/use-debounce';

import Badge from '@/components/systems/Badge';
import Button from '@/components/systems/Button';
import Card from '@/components/systems/Card';
import Checkbox from '@/components/systems/Checkbox';
import Container from '@/components/systems/Container';
import FileInput from '@/components/systems/FileInput';
import Heading from '@/components/systems/Heading';
import Input from '@/components/systems/Input';
import InputDebounce from '@/components/systems/InputDebounce';
import Label from '@/components/systems/Label';
import LabeledInput from '@/components/systems/LabeledInput';
import LinkButton from '@/components/systems/LinkButton';
import LoadingDots from '@/components/systems/LoadingDots';
import Progress from '@/components/systems/Progress';
import Radio from '@/components/systems/Radio';
import Section from '@/components/systems/Section';
import Select from '@/components/systems/Select';
import Shimmer from '@/components/systems/Shimmer';
import ShowMore from '@/components/systems/ShowMore';
import Table from '@/components/systems/Table';
import TableSimple from '@/components/systems/TableSimple';
import Tabs from '@/components/systems/Tabs';
import Text from '@/components/systems/Text';
import TextArea from '@/components/systems/TextArea';
import Wrapper from '@/components/systems/Wrapper';

export default function DesignPage() {
  const [inputDebounce, setInputDebounce] = useState('');
  const debouncedValue = useDebounce(inputDebounce, 500);
  const [inputDebounceValue, setInputDebounceValue] = useState();

  const [file, setFile] = useState({ name: '' });
  function handleFileChange(e: any) {
    setFile({ ...file, name: e.target.files[0].name, [e.target.name]: e.target.files[0] });
  }

  const [selectedColor, setSelectedColor] = useState('blue');
  function handleSelectColor(e: any) {
    setSelectedColor(e.target.value);
  }

  function onNext() {}

  function onPrev() {}

  return (
    <>
      <Wrapper id='hover-card' name='HoverCard'>
        <HoverCard.Root>
          <HoverCard.Trigger data-testid='hovercard' asChild>
            <Link
              href='#'
              className='rounded text-sm font-medium transition-all duration-200 hover:text-sky-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-sky-500'
            >
              Hover Me
            </Link>
          </HoverCard.Trigger>
          <HoverCard.Portal>
            <HoverCard.Content
              side='top'
              data-testid='hovercard-content'
              className={twMerge(
                'z-50 max-h-40 max-w-sm overflow-auto rounded-md border shadow-md',
                'bg-white p-2.5 !text-[15px] leading-5 text-neutral-700',
                'scrollbar-thin scrollbar-thumb-rounded scrollbar-thumb-neutral-200 dark:border-neutral-700 dark:bg-neutral-800 dark:text-white dark:scrollbar-thumb-neutral-800',
              )}
            >
              Laborum sint culpa nisi commodo. Reprehenderit et laborum do commodo et fugiat elit ullamco. Tempor culpa
              elit officia deserunt est amet anim. Irure nostrud esse aliquip commodo. Veniam ullamco irure non sunt
              elit nulla cillum. Tempor ea anim non laboris consectetur aliqua laborum do enim. Anim aliquip tempor
              dolore irure.
            </HoverCard.Content>
          </HoverCard.Portal>
        </HoverCard.Root>
      </Wrapper>

      <Wrapper
        id='badge'
        name='Badge'
        variant={['dark', 'red', 'green', 'yellow', 'indigo', 'pink']}
        props={['isLarge']}
      >
        <div className='flex flex-wrap items-center gap-2'>
          <Badge data-testid='badge'>badge</Badge>
          <Badge.dark data-testid='badge-dark'>dark</Badge.dark>
          <Badge.red data-testid='badge-red'>red</Badge.red>
          <Badge.green data-testid='badge-green'>green</Badge.green>
          <Badge.yellow data-testid='badge-yellow'>yellow</Badge.yellow>
          <Badge.indigo data-testid='badge-indigo'>indigo</Badge.indigo>
          <Badge.purple data-testid='badge-purple'>purple</Badge.purple>
          <Badge.pink data-testid='badge-pink'>pink</Badge.pink>
        </div>
        <br />
        <br />
        <div className='flex flex-wrap items-center gap-2'>
          <Badge isLarge data-testid='badge-large'>
            badge
          </Badge>
          <Badge.dark isLarge data-testid='badge-dark-large'>
            dark
          </Badge.dark>
          <Badge.red isLarge data-testid='badge-red-large'>
            red
          </Badge.red>
          <Badge.green isLarge data-testid='badge-green-large'>
            green
          </Badge.green>
          <Badge.yellow isLarge data-testid='badge-yellow-large'>
            yellow
          </Badge.yellow>
          <Badge.indigo isLarge data-testid='badge-indigo-large'>
            indigo
          </Badge.indigo>
          <Badge.purple isLarge data-testid='badge-purple-large'>
            purple
          </Badge.purple>
          <Badge.pink isLarge data-testid='badge-pink-large'>
            pink
          </Badge.pink>
        </div>
      </Wrapper>

      <Wrapper
        id='button'
        name='Button'
        variant={['success', 'danger', 'secondary', 'tertary']}
        props={['type', 'value', 'disabled', 'onClick']}
      >
        <div className='flex flex-wrap items-center gap-2'>
          <Button data-testid='button-primary'>Primary</Button>
          <Button.success data-testid='button-success'>Success</Button.success>
          <Button.danger data-testid='button-danger' className='flex items-center gap-2'>
            <ArrowRightIcon className='h-4 w-4' />
            Danger
          </Button.danger>
          <Button.secondary data-testid='button-secondary'>Secondary</Button.secondary>
          <Button.tertary data-testid='button-tertary'>Tertary</Button.tertary>
          <Button data-testid='button-disabled' disabled>
            Disabled
          </Button>
        </div>
      </Wrapper>

      <Wrapper id='linkbutton' name='LinkButton' variant={['secondary', 'tertary']} props={['href']}>
        <div className='flex flex-wrap items-center gap-2'>
          <LinkButton href='/design#linkbutton' className='flex items-center gap-2' data-testid='link-button'>
            <ArrowRightIcon className='h-5 w-5' />
            Link Button
          </LinkButton>
          <LinkButton.secondary href='/design#linkbutton' data-testid='link-button-secondary'>
            Link Button Secondary
          </LinkButton.secondary>
          <LinkButton.tertary href='/design#linkbutton' data-testid='link-button-tertary'>
            Link Button Tertary
          </LinkButton.tertary>
        </div>
      </Wrapper>

      <Wrapper
        id='checkbox'
        name='Checkbox'
        props={['name', 'label', 'value', 'onChange', 'checked', 'defaultChecked', 'disabled']}
        noChildren
      >
        <Checkbox name='checkbox-default' label='Checkbox' data-testid='checkbox' />
        <Checkbox name='checkbox-checked' label='Checkbox Checked' data-testid='checkbox-checked' defaultChecked />
        <Checkbox disabled name='checkbox-disabled' label='Checkbox Disabled' data-testid='checkbox-disabled' />
        <Checkbox
          disabled
          name='checkbox-checked-disabled'
          label='Checkbox Checked Disabled'
          data-testid='checkbox-checked-disabled'
          defaultChecked
        />
      </Wrapper>

      <Wrapper id='container' name='Container' props={['small']}>
        <Container data-testid='container'>
          <Text>Container</Text>
        </Container>
        <Container small data-testid='container-small'>
          <Text>Container Small</Text>
        </Container>
      </Wrapper>

      <Wrapper id='heading' name='Heading' props={['h1', 'h2', 'h3']}>
        <Heading h1 data-testid='heading-h1'>
          Heading 1
        </Heading>
        <Heading h2 data-testid='heading-h2'>
          Heading 2
        </Heading>
        <Heading h3 data-testid='heading-h3'>
          Heading 3
        </Heading>
        <Heading data-testid='heading-h4'>Heading 4 (default)</Heading>
      </Wrapper>

      <Wrapper id='input' name='Input' props={['type', 'name', 'placeholder', 'value', 'defaultValue', 'onChange']}>
        <Input name='inputt' placeholder='Input default' data-testid='input' />
      </Wrapper>

      <Wrapper
        id='inputdisabled'
        name='Input disabled'
        props={['type', 'name', 'placeholder', 'value', 'defaultValue', 'onChange']}
      >
        <Input
          disabled
          name='input-disabled'
          placeholder='Input default'
          defaultValue='Has a value'
          data-testid='input-disabled'
        />
      </Wrapper>

      <Wrapper id='label' name='Label'>
        <Label data-testid='label'>Label</Label>
      </Wrapper>

      <Wrapper
        id='labeledinput'
        name='LabeledInput'
        props={['label', 'type', 'name', 'placeholder', 'value', 'defaultValue', 'onChange', 'wrapperClassName']}
      >
        <LabeledInput
          label='Email'
          name='email-labeledinput'
          placeholder='Email'
          type='text'
          data-testid='labeledinput'
        />
        <LabeledInput
          label='Password'
          name='passwordd'
          placeholder='Your Password'
          type='password'
          data-testid='labeledinput-password'
        />
      </Wrapper>

      <Wrapper
        id='labeledinputdisabled'
        name='LabeledInput disabled'
        props={['label', 'type', 'name', 'placeholder', 'value', 'defaultValue', 'onChange', 'wrapperClassName']}
      >
        <LabeledInput
          disabled
          label='Confirmation Password'
          name='confirmation'
          placeholder='confirmation'
          defaultValue='password'
          type='password'
          data-testid='labeledinput-disabled'
        />
      </Wrapper>

      <Wrapper
        id='input-debounce-hook'
        name='Input (Debounce Hook)'
        props={['type', 'name', 'placeholder', 'value', 'defaultValue', 'onChange']}
      >
        <Input
          name='input-debounce-hook'
          placeholder='Input debounce hook'
          data-testid='input-debounce-hook'
          onChange={(e) => setInputDebounce(e.target.value)}
        />
        <Text data-testid='input-debounce-hook-text'>{debouncedValue}</Text>
        <Text>Slower</Text>
      </Wrapper>

      <Wrapper
        id='input-debounce'
        name='InputDebounce'
        props={[
          'label',
          'type',
          'name',
          'placeholder',
          'value',
          'onChange',
          'className',
          'wrapperClassName',
          'debounce',
        ]}
        noChildren
      >
        <InputDebounce
          label='Input Debounce'
          name='inputdebounce'
          placeholder='Input Debounce'
          value={inputDebounceValue}
          onChange={(value) => setInputDebounceValue(value)}
          data-testid='inputdebounce'
        />
        <Text data-testid='inputdebounce-text'>{inputDebounceValue}</Text>
        <Text>Faster</Text>
      </Wrapper>

      <Wrapper
        id='text-area'
        name='TextArea'
        props={['label', 'className', 'name', 'placeholder', 'value', 'defaultValue', 'onChange', 'height']}
        noChildren
      >
        <TextArea label='TextArea' name='textarea' placeholder='text area' data-testid='textarea' />
      </Wrapper>

      <Wrapper
        id='textareadisabled'
        name='TextArea disabled'
        props={['label', 'className', 'name', 'placeholder', 'value', 'defaultValue', 'onChange', 'height']}
        noChildren
      >
        <TextArea
          disabled
          label='TextArea'
          name='textareadis'
          placeholder='text area'
          data-testid='textarea-disabled'
        />
      </Wrapper>

      <Wrapper id='fileinput' name='FileInput' props={['className', 'label', 'name', 'value', 'onChange']} noChildren>
        <FileInput
          data-testid='fileinput'
          label='File'
          name='File'
          value={file ? file.name : ''}
          onChange={handleFileChange}
          accept='.pdf'
        />
      </Wrapper>

      <Wrapper id='select' name='Select' props={['label', 'name', 'value', 'onChange', 'defaultValue']}>
        <Select
          label='Select Color'
          name='color'
          value={selectedColor ? selectedColor : 'Choose Color'}
          onChange={handleSelectColor}
          data-testid='select'
        >
          <Select.option value='red'>Red</Select.option>
          <Select.option value='blue'>Blue</Select.option>
          <Select.option value='green'>Green</Select.option>
        </Select>
      </Wrapper>

      <Wrapper id='selectnativeoption' name='Select.option' props={['value']} noClassName>
        <Select.option value='red' data-testid='selectoption-red'>
          Red
        </Select.option>
        <Select.option value='blue' data-testid='selectoption-blue'>
          Blue
        </Select.option>
        <Select.option value='green' data-testid='selectoption-green'>
          Green
        </Select.option>
      </Wrapper>

      <Wrapper id='progress' name='Progress' variant={['percentage']} props={['percent']} noChildren>
        <Progress percent={45} data-testid='progress' />
        <br />
        <Progress.percentage percent={0} data-testid='progress-zero' />
        <br />
        <Progress.percentage percent={75} data-testid='progress-percent' />
      </Wrapper>

      <Wrapper
        id='radio'
        name='Radio'
        props={['name', 'label', 'value', 'onChange', 'checked', 'defaultChecked', 'disabled']}
        noChildren
      >
        <Radio name='radio' value='radio-blue' label='Blue' data-testid='radio' />
        <Radio name='radio' value='radio-red' label='Red' defaultChecked data-testid='radio-checked' />
        <Radio disabled name='radios' value='enable' label='Radio Disabled' data-testid='radio-disabled' />
        <Radio
          disabled
          name='radioss'
          value='disable'
          label='Radio Checked Disabled'
          defaultChecked
          data-testid='radio-checked-disabled'
        />
      </Wrapper>

      <Wrapper id='shimmer' name='Shimmer' noChildren noProps>
        <Shimmer className='max-w-[5rem] mb-2' data-testid='shimmer' />
        <Shimmer className='max-w-[10rem] mb-2' />
        <Shimmer className='max-w-[15rem]' />
      </Wrapper>

      <Wrapper id='tabs' name='Tabs' props={['items']}>
        <Tabs items={['Tab A', 'Tab B', 'Tab C']} data-testid='tabs'>
          <Tabs.panel>
            <Heading h2 className='mb-0 text-lg'>
              Tab Content A
            </Heading>
          </Tabs.panel>
          <Tabs.panel>
            <Heading h2 className='mb-0 text-lg'>
              Tab Content B
            </Heading>
          </Tabs.panel>
          <Tabs.panel>
            <Heading h2 className='mb-0 text-lg'>
              Tab Content C
            </Heading>
          </Tabs.panel>
        </Tabs>
      </Wrapper>

      <Wrapper id='tabitem' name='Tabs.panel'>
        <Tabs items={['Tab']}>
          <Tabs.panel data-testid='tabs-panel'>
            <Heading h2 className='mb-0 text-lg'>
              Tabs Panel
            </Heading>
          </Tabs.panel>
        </Tabs>
      </Wrapper>

      <Wrapper
        id='table'
        name='Table'
        props={['head', 'totalPage', 'totalData', 'currentPage', 'next', 'prev', 'rowPerPage', 'noPagination']}
        noWrap
      >
        <Table
          totalPage={5}
          totalData={50}
          currentPage={1}
          next={onNext}
          prev={onPrev}
          data-testid='table'
          head={
            <>
              <Table.th shrink>No</Table.th>
              <Table.th>Column 1</Table.th>
              <Table.th>Column 2</Table.th>
              <Table.th>Column 3</Table.th>
              <Table.th>Column 4</Table.th>
              <Table.th>Column 5</Table.th>
              <Table.th>Column 6</Table.th>
              <Table.th>Column 7</Table.th>
              <Table.th>Column 8</Table.th>
            </>
          }
        >
          {[...Array(5).keys()].map((e, index) => {
            return (
              <Table.tr key={index}>
                <Table.td shrink>{index + 1}</Table.td>
                <Table.td className='text-center'>
                  <Badge>badge</Badge>
                </Table.td>
                <Table.td className='text-center'>
                  <Badge.red>badge red</Badge.red>
                </Table.td>
                <Table.td className='text-center'>
                  <Badge.dark>badge dark</Badge.dark>
                </Table.td>
                <Table.td className='text-center'>
                  <Badge.green>badge green</Badge.green>
                </Table.td>
                <Table.td className='text-center'>
                  <Badge.yellow>badge yellow</Badge.yellow>
                </Table.td>
                <Table.td className='text-center'>
                  <Badge.indigo>badge indigo</Badge.indigo>
                </Table.td>
                <Table.td className='text-center'>
                  <Badge.purple>badge purple</Badge.purple>
                </Table.td>
                <Table.td className='text-center'>
                  <Badge.pink>badge pink</Badge.pink>
                </Table.td>
              </Table.tr>
            );
          })}
        </Table>
      </Wrapper>

      <Wrapper id='tabletr' name='Table.tr' noWrap>
        <Table>
          <Table.tr data-testid='table-tr'>
            <Table.td>
              <Badge>Table.tr</Badge>
            </Table.td>
          </Table.tr>
        </Table>
      </Wrapper>

      <Wrapper id='tabletd' name='Table.td' props={['shrink']} noWrap>
        <Table>
          <Table.tr>
            <Table.td data-testid='table-td'>
              <Badge>Table.td</Badge>
            </Table.td>
          </Table.tr>
        </Table>
      </Wrapper>

      <Wrapper id='table-simple' name='TableSimple' props={['head', 'bordered', 'caption', 'wrapperClassName']} noWrap>
        <TableSimple
          data-testid='table-simple'
          caption='Table 3.1: Badge'
          head={
            <>
              <TableSimple.th shrink>No</TableSimple.th>
              <TableSimple.th>Column 1</TableSimple.th>
              <TableSimple.th>Column 2</TableSimple.th>
              <TableSimple.th>Column 3</TableSimple.th>
              <TableSimple.th>Column 4</TableSimple.th>
              <TableSimple.th>Column 5</TableSimple.th>
            </>
          }
        >
          {[...Array(5).keys()].map((e, index) => {
            return (
              <TableSimple.tr key={index}>
                <TableSimple.td shrink>{index + 1}</TableSimple.td>
                <TableSimple.td className='text-center'>
                  <Badge>badge</Badge>
                </TableSimple.td>
                <TableSimple.td className='text-center'>
                  <Badge.red>badge red</Badge.red>
                </TableSimple.td>
                <TableSimple.td className='text-center'>
                  <Badge.dark>badge dark</Badge.dark>
                </TableSimple.td>
                <TableSimple.td className='text-center'>
                  <Badge.green>badge green</Badge.green>
                </TableSimple.td>
                <TableSimple.td className='text-center'>
                  <Badge.yellow>badge yellow</Badge.yellow>
                </TableSimple.td>
              </TableSimple.tr>
            );
          })}
        </TableSimple>
      </Wrapper>

      <Wrapper id='tablesimple-tr' name='TableSimple.tr' noWrap noProps>
        <TableSimple>
          <TableSimple.tr data-testid='tablesimple-tr'>
            <TableSimple.td>
              <Badge>TableSimple.tr</Badge>
            </TableSimple.td>
          </TableSimple.tr>
        </TableSimple>
      </Wrapper>

      <Wrapper id='tablesimple-td' name='TableSimple.td' props={['shrink', 'bordered']} noWrap noProps>
        <TableSimple>
          <TableSimple.tr>
            <TableSimple.td data-testid='tablesimple-td'>
              <Badge>TableSimple.td</Badge>
            </TableSimple.td>
          </TableSimple.tr>
        </TableSimple>
      </Wrapper>

      <Wrapper id='text' name='Text' variant={['light', 'medium', 'semibold', 'bold', 'extrabold']}>
        <Text.light data-testid='text-light' className='mb-2'>
          Light
        </Text.light>
        <Text data-testid='text' className='mb-2'>
          Default
        </Text>
        <Text.medium data-testid='text-medium' className='mb-2'>
          Medium
        </Text.medium>
        <Text.semibold data-testid='text-semibold' className='mb-2'>
          Semibold
        </Text.semibold>
        <Text.bold data-testid='text-bold' className='mb-2'>
          Bold
        </Text.bold>
        <Text.extrabold data-testid='text-extrabold' className='mb-2'>
          Extrabold
        </Text.extrabold>
      </Wrapper>

      <Wrapper id='card' name='Card'>
        <Card data-testid='card'>
          <Text>Card Content</Text>
        </Card>
      </Wrapper>

      <Wrapper id='section' name='Section' variant={['small']}>
        <Section data-testid='section'>
          <Text>Section Default</Text>
        </Section>
        <Section.small data-testid='section-small'>
          <Text>Section Small</Text>
        </Section.small>
      </Wrapper>

      <Wrapper id='show-more' name='ShowMore' props={['count']}>
        <ShowMore data-testid='showmore'>
          Id amet commodo exercitation aliqua irure exercitation adipisicing ipsum cillum elit. Cillum non dolor cillum
          mollit incididunt tempor quis reprehenderit labore velit sunt anim ipsum quis. Id nostrud anim ut excepteur
          pariatur. Eu ad esse nisi et fugiat. Exercitation culpa cupidatat consequat veniam commodo aute id enim Lorem
          id consectetur aliqua. Quis culpa do est non irure aliquip proident exercitation aliqua mollit anim dolor
          labore.
        </ShowMore>
      </Wrapper>

      <Wrapper id='loading-dots' name='LoadingDots' props={['medium', 'large']} noChildren>
        <LoadingDots data-testid='loadingdots' />
        <br />
        <br />
        <LoadingDots medium data-testid='loadingdots-medium' />
        <br />
        <br />
        <LoadingDots large data-testid='loadingdots-large' />
      </Wrapper>

      <Wrapper id='loading-skeleton' name='LoadingSkeleton' noClassName noProps noChildren>
        <div className='grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4'>
          <Shimmer className='space-y-5 rounded-2xl'>
            <div className='h-24 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='space-y-3'>
              <div className='h-3 w-3/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-4/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-2/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          </Shimmer>

          <Shimmer className='space-y-5 rounded-2xl'>
            <div className='h-44 w-full rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
          </Shimmer>

          <Shimmer className='space-y-5 rounded-2xl'>
            <div className='space-y-3'>
              <div className='h-3 w-3/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-4/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-2/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
            <div className='space-y-3'>
              <div className='h-3 w-1/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-2/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-3/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-4/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='w-5/5 h-3 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          </Shimmer>

          <Shimmer className='space-y-5 rounded-2xl'>
            <div className='h-24 w-24 rounded-full bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            <div className='space-y-3'>
              <div className='h-3 w-3/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-4/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
              <div className='h-3 w-2/5 rounded-lg bg-neutral-300/70 dark:bg-neutral-700/50'></div>
            </div>
          </Shimmer>

          <Shimmer className='rounded-2xl h-8' />

          <Shimmer className='rounded-full h-20 w-20' />

          <Shimmer className='rounded h-20' />

          <Shimmer className='rounded-3xl h-20 w-20' />
        </div>
      </Wrapper>
    </>
  );
}
